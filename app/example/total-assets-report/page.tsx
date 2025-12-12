'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalAssetsReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total assets report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'ASSET',
    'CHBAL',
    'SC',
    'FREPO',
    'LNLSNET',
    'TRADE',
    'BKPREM',
    'ORE',
    'INTAN',
    'AOA',
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
      key: 'ASSET',
      label: 'Total Assets',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'CHBAL',
      label: 'Cash & Balances',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SC',
      label: 'Securities',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'FREPO',
      label: 'Fed Funds Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'LNLSNET',
      label: 'Net Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'BKPREM',
      label: 'Bank Premises',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ORE',
      label: 'ORE',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'INTAN',
      label: 'Intangibles',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'AOA',
      label: 'Other Assets',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Assets Report"
        description="Comprehensive breakdown of total assets for active FDIC-insured institutions, including cash, securities, loans, trading assets, bank premises, ORE, intangibles, and other assets."
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
