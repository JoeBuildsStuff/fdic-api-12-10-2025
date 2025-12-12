'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function LossSharingReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'LSALNLS',
    'LRECONS',
    'LREAG',
    'LRERES',
    'LREMULT',
    'LRENRES',
    'LCI',
    'LCON',
    'LAG',
    'LOTH',
    'P3LTOT',
    'P9LTOT',
    'NALTOT',
    'LSAORE',
    'LSASCDBT',
    'LSAOA',
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
      key: 'LSALNLS',
      label: 'Total Covered Loans',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'LRERES',
      label: 'Covered: Res RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'LRENRES',
      label: 'Covered: Non-Res RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'LCI',
      label: 'Covered: C&I',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'LCON',
      label: 'Covered: Consumer',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'P3LTOT',
      label: 'PD 30-89 Days',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'P9LTOT',
      label: 'PD 90+ Days',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NALTOT',
      label: 'Nonaccrual',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'LSAORE',
      label: 'Covered ORE',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Loss-Sharing Agreements Report"
        description="Assets covered by loss-sharing agreements with the FDIC, including loans and leases by type, past due amounts, and other covered assets."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="LSALNLS"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}

