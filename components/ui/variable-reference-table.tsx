'use client';

import { useMemo, useState } from 'react';
import type { VariableDefinition } from '@/lib/data/variable-definitions';

type VariableReferenceTableProps = {
  items: VariableDefinition[];
};

export function VariableReferenceTable({ items }: VariableReferenceTableProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return items;

    return items.filter(({ variable, title, definition }) => {
      return [variable, title, definition]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized));
    });
  }, [items, query]);

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="variable-search"
          className="block text-sm font-medium text-fd-muted-foreground"
        >
          Filter variables
        </label>
        <input
          id="variable-search"
          type="search"
          value={query}
          placeholder="Search by code, title, or definition keywords"
          onChange={(event) => setQuery(event.target.value)}
          className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
        />
        <p className="mt-1 text-xs text-fd-muted-foreground">
          Showing {filtered.length.toLocaleString()} of {items.length.toLocaleString()} fields
        </p>
      </div>

      <table className="min-w-full divide-y text-sm">
        <thead className="bg-fd-muted/60 text-xs uppercase tracking-wide text-fd-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold">
              Variable
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">
              Title
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">
              Definition
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filtered.map((item, index) => (
            <tr key={`${item.variable}-${index}`} className="align-top">
              <td className="px-4 py-3 font-mono text-sm font-semibold text-fd-primary">
                {item.variable}
              </td>
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3 text-fd-muted-foreground">{item.definition}</td>
            </tr>
          ))}
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-sm text-fd-muted-foreground"
              >
                No variables match “{query}”.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
