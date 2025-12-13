'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function NetChargeOffsReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for net charge-offs report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'NTLNLS',
    'NTRE',
    'NTDEP',
    'NTAG',
    'NTCI',
    'NTCON',
    'NTCRCD',
    'NTAUTO',
    'NTFORGV',
    'NTOTHER',
    'NTLS',
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
      key: 'NTLNLS',
      label: 'Total Net Charge-Offs',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'NTRE',
      label: 'Real Estate Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTDEP',
      label: 'Loans to Depository Institutions',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTAG',
      label: 'Agricultural Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTCI',
      label: 'Commercial and Industrial Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTCON',
      label: 'Consumer Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTCRCD',
      label: 'Credit Card Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTAUTO',
      label: 'Auto Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTFORGV',
      label: 'Loans to Foreign Governments',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTOTHER',
      label: 'Other Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NTLS',
      label: 'Lease Financing Receivables',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Net Charge-Offs Report"
        description="Comprehensive breakdown of net charge-offs by loan category for active FDIC-insured institutions, showing charge-offs minus recoveries for each loan type."
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

