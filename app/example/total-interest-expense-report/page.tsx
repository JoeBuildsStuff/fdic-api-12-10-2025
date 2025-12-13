'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalInterestExpenseReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total interest expense report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'EINTEXP',
    'EDEPDOM',
    'EDEPFOR',
    'EFREPP',
    'EOTHINT',
    'NIM',
    'ELNATR',
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
      key: 'EINTEXP',
      label: 'Total Interest Expense',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'EDEPDOM',
      label: 'Domestic Office Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EDEPFOR',
      label: 'Foreign Office Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EFREPP',
      label: 'Federal Funds Purchased',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EOTHINT',
      label: 'Other Interest Expense',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NIM',
      label: 'Net Interest Margin',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ELNATR',
      label: 'Provision For Credit Losses',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Interest Expense Report"
        description="Comprehensive breakdown of total interest expense for active FDIC-insured institutions, including domestic and foreign office deposits, federal funds purchased, and other interest expense sources."
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

