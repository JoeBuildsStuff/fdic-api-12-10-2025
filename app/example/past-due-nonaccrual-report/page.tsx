'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function PastDueNonaccrualReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'ASSET',
    'P3ASSET',
    'P3RE',
    'P3AG',
    'P3CI',
    'P3CON',
    'P3CRCD',
    'P3AUTO',
    'P9ASSET',
    'P9RE',
    'P9AG',
    'P9CI',
    'P9CON',
    'P9CRCD',
    'P9AUTO',
    'NAASSET',
    'NARE',
    'NAAG',
    'NACI',
    'NACON',
    'NACRCD',
    'NAAUTO',
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
      className: 'text-right',
    },
    {
      key: 'P3ASSET',
      label: 'Past Due 30-89 Days',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'P3RE',
      label: 'PD 30-89: RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'P3CI',
      label: 'PD 30-89: C&I',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'P9ASSET',
      label: 'Past Due 90+ Days',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'P9RE',
      label: 'PD 90+: RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'P9CI',
      label: 'PD 90+: C&I',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'NAASSET',
      label: 'Nonaccrual',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'NARE',
      label: 'Nonaccrual: RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'NACI',
      label: 'Nonaccrual: C&I',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Past Due and Nonaccrual Assets Report"
        description="Detailed information on assets that are past due or in nonaccrual status, including breakdowns by loan type (Real Estate, C&I, Consumer, etc.)."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="NAASSET"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}

