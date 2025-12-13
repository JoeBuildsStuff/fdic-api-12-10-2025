'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalRecoveriesReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total recoveries report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'CRLNLS',
    'CRRE',
    'CRDEP',
    'CRAG',
    'CRCI',
    'CRCON',
    'CRCRCD',
    'CRAUTO',
    'CRFORGV',
    'CROTHER',
    'CRLS',
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
      key: 'CRLNLS',
      label: 'Total Recoveries',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'CRRE',
      label: 'Real Estate Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRDEP',
      label: 'Loans to Depository Institutions',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRAG',
      label: 'Agricultural Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRCI',
      label: 'Commercial and Industrial Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRCON',
      label: 'Consumer Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRCRCD',
      label: 'Credit Card Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRAUTO',
      label: 'Auto Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRFORGV',
      label: 'Loans to Foreign Governments',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CROTHER',
      label: 'Other Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'CRLS',
      label: 'Lease Financing Receivables',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Recoveries Report"
        description="Comprehensive breakdown of total recoveries by loan category for active FDIC-insured institutions, showing amounts recovered on previously charged-off loans."
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

