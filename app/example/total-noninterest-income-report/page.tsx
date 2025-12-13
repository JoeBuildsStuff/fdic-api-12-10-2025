'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function TotalNoninterestIncomeReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for total noninterest income report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'NONII',
    'IFIDUC',
    'ISERCHG',
    'IGLTRAD',
    'ADDNONII',
    'NETGNSLN',
    'NETGNSRE',
    'NETGNAST',
    'IOTNII',
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
      key: 'NONII',
      label: 'Total Noninterest Income',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'IFIDUC',
      label: 'Fiduciary Activities',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ISERCHG',
      label: 'Service Charges on Deposit Accounts',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IGLTRAD',
      label: 'Trading Account Gains & Fees',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ADDNONII',
      label: 'Additional Noninterest Income',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NETGNSLN',
      label: 'Net Gains (Losses) on Loans',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NETGNSRE',
      label: 'Net Gains (Losses) on Real Estate',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NETGNAST',
      label: 'Net Gains (Losses) on Assets',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'IOTNII',
      label: 'Other Noninterest Income',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Noninterest Income Report"
        description="Comprehensive breakdown of total noninterest income for active FDIC-insured institutions, including fiduciary activities, service charges, trading account gains, and other fee income sources."
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

