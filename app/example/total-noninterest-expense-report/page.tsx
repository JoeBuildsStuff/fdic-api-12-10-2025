'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalNoninterestExpenseReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total noninterest expense report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'NONIX',
    'ESAL',
    'EPREMAGG',
    'ADDNONINTEXP',
    'PTAXNETINC',
    'IGLSEC',
    'ITAX',
    'IBEFXTR',
    'EXTRA',
    'NETINC',
  ].join(',');

  const columns = [
    {
      key: 'CERT',
      label: 'Cert #',
      className: 'font-mono text-xs',
    },
    {
      key: 'NAMEFULL',
      label: 'Institution Name',
      className: 'font-medium',
    },
    {
      key: 'CITY',
      label: 'City',
    },
    {
      key: 'STALP',
      label: 'State',
    },
    {
      key: 'NONIX',
      label: 'Total Noninterest Expense',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'ESAL',
      label: 'Salaries and Employee Benefits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EPREMAGG',
      label: 'Premises and Equipment Expense',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ADDNONINTEXP',
      label: 'Additional Noninterest Expense',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'PTAXNETINC',
      label: 'Pre-tax Net Operating Income',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IGLSEC',
      label: 'Securities Gains (Losses)',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ITAX',
      label: 'Applicable Income Taxes',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IBEFXTR',
      label: 'Income Before Extraordinary Items',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EXTRA',
      label: 'Discontinued Operations (Extraordinary)',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NETINC',
      label: 'Net Income Attributable to Bank',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Noninterest Expense & Other Report"
        description="Comprehensive breakdown of total noninterest expense and other income statement items for active FDIC-insured institutions, including operating expenses, taxes, and net income."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="CERT"
        defaultSortOrder="ASC"
        limit={1000}
      />
    </div>
  );
}

