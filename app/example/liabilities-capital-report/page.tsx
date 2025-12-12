'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function LiabilitiesCapitalReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'LIABEQ',
    'LIAB',
    'DEP',
    'DEPDOM',
    'COREDEP',
    'DEPINS',
    'FREPP',
    'TRADEL',
    'OTHBRF',
    'SUBND',
    'ALLOTHL',
    'EQTOT',
    'EQ',
    'EQPP',
    'EQCS',
    'EQSUR',
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
      key: 'LIABEQ',
      label: 'Total Liab & Equity',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'LIAB',
      label: 'Total Liabilities',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DEP',
      label: 'Total Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DEPDOM',
      label: 'Domestic Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'COREDEP',
      label: 'Core Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'DEPINS',
      label: 'Insured Deposits',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'FREPP',
      label: 'Fed Funds Purchased',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EQTOT',
      label: 'Total Equity',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'NETINC',
      label: 'Net Income',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Total Liabilities and Capital Report"
        description="Comprehensive view of total liabilities and equity capital for active FDIC-insured institutions, including deposits, borrowed funds, and equity components."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="LIABEQ"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}
