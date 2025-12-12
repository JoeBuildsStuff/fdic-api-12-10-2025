// Base URL from FDIC API documentation.
// IMPORTANT: financials endpoint is /banks/financials (NOT /banks/api/financials).
// Verified:
// - https://api.fdic.gov/banks/financials?limit=1&format=json -> 200
// - https://api.fdic.gov/banks/api/financials?limit=1&format=json -> 404
const FDIC_API_BASE = 'https://api.fdic.gov/banks';

// FDIC API response structure: data array contains objects with nested "data" property
export type FDICApiResponse<T> = {
  meta: {
    total: number;
    parameters: {
      filters: string;
      fields: string;
      limit: number;
      offset: number;
    };
  };
  data: Array<{
    data: T;
    score?: number;
  }>;
};

export type FDICFinancialsRecord = Record<string, unknown>;

export function buildFDICFinancialsUrl(params: {
  filters?: string;
  fields?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}): string {
  const searchParams = new URLSearchParams();

  if (params.filters) searchParams.set('filters', params.filters);
  if (params.fields) searchParams.set('fields', params.fields);
  if (params.sortBy) searchParams.set('sort_by', params.sortBy);
  if (params.sortOrder) searchParams.set('sort_order', params.sortOrder);
  if (params.limit !== undefined) searchParams.set('limit', params.limit.toString());
  if (params.offset !== undefined) searchParams.set('offset', params.offset.toString());
  searchParams.set('format', 'json');

  return `${FDIC_API_BASE}/financials?${searchParams.toString()}`;
}

export async function fetchFDICFinancials(params: {
  filters?: string;
  fields?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}): Promise<FDICApiResponse<FDICFinancialsRecord>> {
  const url = buildFDICFinancialsUrl(params);
  
  console.log('[FDIC API] Request URL:', url);
  console.log('[FDIC API] Request params:', {
    filters: params.filters,
    fields: params.fields,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    limit: params.limit,
    offset: params.offset,
  });
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  console.log('[FDIC API] Response status:', response.status, response.statusText);
  console.log('[FDIC API] Response headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    let errorBody = '';
    try {
      errorBody = await response.text();
      console.error('[FDIC API] Error response body:', errorBody);
    } catch (e) {
      console.error('[FDIC API] Could not read error response body:', e);
    }
    
    const errorMessage = `FDIC API error: ${response.status} ${response.statusText} (url=${url})${errorBody ? ` - ${errorBody}` : ''}`;
    console.error('[FDIC API] Full error:', errorMessage);
    throw new Error(errorMessage);
  }

  const apiResponse = await response.json();
  console.log('[FDIC API] Success - Records returned:', apiResponse.data?.length || 0);
  
  // Extract the nested data property from each item
  // The API returns: { data: [{ data: {...}, score: 0 }, ...] }
  // We need to flatten it to: { data: [{...}, ...] }
  const flattenedData = {
    ...apiResponse,
    data: apiResponse.data?.map((item: { data: FDICFinancialsRecord; score?: number }) => item.data) || [],
  };
  
  return flattenedData;
}

// Helper to format currency values (in thousands)
export function formatCurrency(value: unknown): string {
  if (value === null || value === undefined) return '—';
  const num = Number(value);
  if (isNaN(num)) return String(value);
  if (num === 0) return '$0';
  
  // Values are in thousands, so multiply by 1000 for display
  const dollars = num * 1000;
  
  if (Math.abs(dollars) >= 1_000_000_000) {
    return `$${(dollars / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(dollars) >= 1_000_000) {
    return `$${(dollars / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(dollars) >= 1_000) {
    return `$${(dollars / 1_000).toFixed(2)}K`;
  }
  return `$${dollars.toFixed(0)}`;
}

// Helper to format percentage values
export function formatPercentage(value: unknown): string {
  if (value === null || value === undefined) return '—';
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return `${num.toFixed(2)}%`;
}
