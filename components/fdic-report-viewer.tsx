'use client';

import { useEffect, useState } from 'react';
import {
  buildFDICFinancialsUrl,
  fetchFDICFinancials,
  type FDICFinancialsRecord,
} from '@/lib/fdic-api';
import { FDICDataTable } from '@/components/ui/fdic-data-table';

type FDICReportViewerProps = {
  title: string;
  description?: string;
  filters: string;
  fields: string;
  columns: {
    key: string;
    label: string;
    format?: (value: unknown) => string;
    className?: string;
  }[];
  defaultSortBy?: string;
  defaultSortOrder?: 'ASC' | 'DESC';
  limit?: number;
};

export function FDICReportViewer({
  title,
  description,
  filters,
  fields,
  columns,
  defaultSortBy = 'REPDTE',
  defaultSortOrder = 'DESC',
  limit = 1000,
}: FDICReportViewerProps) {
  const [data, setData] = useState<FDICFinancialsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestUrl, setLastRequestUrl] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState('20220930'); // Default to Q3 2022
  const [certInput, setCertInput] = useState('');
  const [certApplied, setCertApplied] = useState<string | null>(null);
  const [certValidationError, setCertValidationError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      setLastRequestUrl(null);
      
      try {
        // Update filters to include the selected report date
        const dateFilter = `REPDTE:${reportDate}`;
        let updatedFilters = filters;
        if (filters.includes('REPDTE:')) {
          // Replace existing REPDTE filter
          updatedFilters = filters.replace(/REPDTE:\d{8}/g, dateFilter);
        } else {
          // Add REPDTE filter
          updatedFilters = filters ? `${filters} AND ${dateFilter}` : dateFilter;
        }

        if (certApplied) {
          updatedFilters = `${updatedFilters} AND CERT:${certApplied}`;
        }

        const requestParams = {
          filters: updatedFilters,
          fields,
          sortBy: defaultSortBy,
          sortOrder: defaultSortOrder,
          limit,
          offset: 0,
        } as const;

        setLastRequestUrl(buildFDICFinancialsUrl(requestParams));

        const response = await fetchFDICFinancials(requestParams);

        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filters, fields, defaultSortBy, defaultSortOrder, limit, reportDate, certApplied]);

  // Generate report date options (last 4 quarters)
  const getQuarterDates = () => {
    const dates: string[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    
    // Determine current quarter (0-3)
    const currentQuarter = Math.floor(currentMonth / 3);
    
    // Generate last 4 quarter-end dates
    for (let i = 0; i < 4; i++) {
      let year = currentYear;
      let quarter = currentQuarter - i;
      
      // Handle year rollover
      while (quarter < 0) {
        quarter += 4;
        year -= 1;
      }
      
      // Quarter-end dates: Q1=Mar31, Q2=Jun30, Q3=Sep30, Q4=Dec31
      const quarterEndMonths = [2, 5, 8, 11]; // March, June, September, December (0-indexed)
      const quarterEndDays = [31, 30, 30, 31];
      
      const month = quarterEndMonths[quarter];
      const day = quarterEndDays[quarter];
      
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      dates.push(`${year}${monthStr}${dayStr}`);
    }
    return dates;
  };

  const quarterDates = getQuarterDates();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-fd-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-b pb-4 md:flex-row md:items-end">
        <div>
          <label htmlFor="report-date" className="block text-sm font-medium text-fd-muted-foreground mb-1">
            Report Date
          </label>
          <select
            id="report-date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          >
            {quarterDates.map((date) => {
              const d = new Date(
                parseInt(date.substring(0, 4)),
                parseInt(date.substring(4, 6)) - 1,
                parseInt(date.substring(6, 8))
              );
              return (
                <option key={date} value={date}>
                  {d.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </option>
              );
            })}
          </select>
        </div>

        <form
          className="flex flex-col gap-2 md:flex-row md:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            const normalized = certInput.trim();
            if (!normalized) {
              setCertApplied(null);
              setCertValidationError(null);
              return;
            }
            if (!/^\d+$/.test(normalized)) {
              setCertValidationError('CERT must be digits only.');
              return;
            }
            setCertValidationError(null);
            setCertApplied(normalized);
          }}
        >
          <div>
            <label htmlFor="cert-number" className="block text-sm font-medium text-fd-muted-foreground mb-1">
              Cert #
            </label>
            <input
              id="cert-number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              placeholder="e.g. 3510"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring md:w-48"
            />
            {certValidationError ? (
              <div className="mt-1 text-xs text-red-600">{certValidationError}</div>
            ) : null}
            {certApplied ? (
              <div className="mt-1 text-xs text-fd-muted-foreground">
                Applied filter: <span className="font-mono">CERT:{certApplied}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md border bg-transparent px-3 py-2 text-sm hover:bg-fd-muted"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setCertInput('');
                setCertApplied(null);
                setCertValidationError(null);
              }}
              className="rounded-md border bg-transparent px-3 py-2 text-sm hover:bg-fd-muted"
            >
              Clear
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-sm text-fd-muted-foreground">Loading...</div>
        )}
      {error && (
        <div className="text-sm text-red-600">
          <div className="font-semibold mb-1">Error: {error}</div>
          <details className="mt-2 text-xs">
            <summary className="cursor-pointer text-fd-muted-foreground hover:text-fd-foreground">
              View error details
            </summary>
              {lastRequestUrl ? (
                <div className="mt-2">
                  <div className="text-fd-muted-foreground mb-1">Request URL</div>
                  <pre className="p-2 bg-fd-muted rounded text-xs overflow-auto">
                    {lastRequestUrl}
                  </pre>
                </div>
              ) : null}
            <pre className="mt-2 p-2 bg-fd-muted rounded text-xs overflow-auto">
              {error}
            </pre>
          </details>
        </div>
      )}
      </div>

      {!loading && !error && (
        <FDICDataTable
          data={data}
          columns={columns}
          searchable
          searchPlaceholder="Search institutions..."
          defaultPageSize={25}
        />
      )}

      {loading && (
        <div className="text-center py-12 text-fd-muted-foreground">
          Loading data from FDIC API...
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 mb-2">Failed to load data</p>
          <p className="text-sm text-fd-muted-foreground">{error}</p>
        </div>
      )}
    </div>
  );
}
