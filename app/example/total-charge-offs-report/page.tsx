'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalChargeOffsReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total charge-offs report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'DRLNLS',
    'DRRE',
    'DRDEP',
    'DRAG',
    'DRCI',
    'DRCON',
    'DRCRCD',
    'DRAUTO',
    'DRFORGV',
    'DROTHER',
    'DRLS',
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
      key: 'DRLNLS',
      label: 'Total Charge-Offs',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'DRRE',
      label: 'Real Estate Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRDEP',
      label: 'Loans to Depository Institutions',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRAG',
      label: 'Agricultural Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRCI',
      label: 'Commercial and Industrial Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRCON',
      label: 'Consumer Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRCRCD',
      label: 'Credit Card Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRAUTO',
      label: 'Auto Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRFORGV',
      label: 'Loans to Foreign Governments',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DROTHER',
      label: 'Other Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DRLS',
      label: 'Lease Financing Receivables',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Charge-Offs Report"
        description="Comprehensive breakdown of total charge-offs by loan category for active FDIC-insured institutions, showing loans written off as uncollectible during the reporting period."
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

