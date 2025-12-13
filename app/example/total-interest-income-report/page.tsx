'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalInterestIncomeReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total interest income report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'INTINC',
    'ILNDOM',
    'ILNFOR',
    'ILS',
    'ICHBAL',
    'ISC',
    'ITRADE',
    'IFREPO',
    'IOTHII',
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
      key: 'INTINC',
      label: 'Total Interest Income',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'ILNDOM',
      label: 'Domestic Office Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ILNFOR',
      label: 'Foreign Office Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ILS',
      label: 'Lease Financing',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ICHBAL',
      label: 'Balances Due from Depository Institutions',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ISC',
      label: 'Securities',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ITRADE',
      label: 'Trading Accounts',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IFREPO',
      label: 'Federal Funds Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IOTHII',
      label: 'Other Interest Income',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Interest Income Report"
        description="Comprehensive breakdown of total interest income for active FDIC-insured institutions, including domestic and foreign office loans, lease financing, securities, trading accounts, and other interest income sources."
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

