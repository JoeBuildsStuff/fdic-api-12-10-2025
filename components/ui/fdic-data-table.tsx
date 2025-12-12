'use client';

import { useMemo, useState } from 'react';

type FDICDataTableProps = {
  data: Record<string, unknown>[];
  columns: {
    key: string;
    label: string;
    format?: (value: unknown) => string;
    className?: string;
  }[];
  searchable?: boolean;
  searchPlaceholder?: string;
  defaultPageSize?: number;
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'number') {
    // Format large numbers with commas
    if (value >= 1000) {
      return value.toLocaleString('en-US');
    }
    return value.toString();
  }
  return String(value);
}

export function FDICDataTable({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search...',
  defaultPageSize = 25,
}: FDICDataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data;

    const normalized = searchQuery.trim().toLowerCase();
    return data.filter((row) => {
      return Object.values(row)
        .some((value) => {
          const str = formatValue(value).toLowerCase();
          return str.includes(normalized);
        });
    });
  }, [data, searchQuery, searchable]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-4">
      {searchable && (
        <div>
          <label
            htmlFor="fdic-search"
            className="block text-sm font-medium text-fd-muted-foreground"
          >
            Search
          </label>
          <input
            id="fdic-search"
            type="search"
            value={searchQuery}
            placeholder={searchPlaceholder}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          />
          <p className="mt-1 text-xs text-fd-muted-foreground">
            Showing {paginatedData.length.toLocaleString()} of{' '}
            {filteredData.length.toLocaleString()} records
            {filteredData.length !== data.length && ` (filtered from ${data.length.toLocaleString()})`}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-fd-muted/60 text-xs uppercase tracking-wide text-fd-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-left font-semibold ${column.className || ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-fd-muted-foreground"
                >
                  {searchQuery ? `No records match "${searchQuery}".` : 'No data available.'}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index} className="align-top hover:bg-fd-muted/30">
                  {columns.map((column) => {
                    const value = row[column.key];
                    const formatted = column.format
                      ? column.format(value)
                      : formatValue(value);
                    return (
                      <td
                        key={column.key}
                        className={`px-4 py-3 ${column.className || ''}`}
                      >
                        {formatted}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <label htmlFor="page-size" className="text-sm text-fd-muted-foreground">
              Rows per page:
            </label>
            <select
              id="page-size"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-md border bg-transparent px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border bg-transparent px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fd-muted"
            >
              Previous
            </button>
            <span className="text-sm text-fd-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border bg-transparent px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fd-muted"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
