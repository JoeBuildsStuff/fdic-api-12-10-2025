'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function CashDividendsReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for cash dividends report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'EQCDIV',
    'EQCDIVP',
    'EQCDIVC',
    'EQCSTKRX',
    'NOIJ',
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
      key: 'EQCDIV',
      label: 'Total Cash Dividends',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'EQCDIVP',
      label: 'Preferred Stock Dividends',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EQCDIVC',
      label: 'Common Stock Dividends',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'EQCSTKRX',
      label: 'Net Additions to Capital Stock',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'NOIJ',
      label: 'Net Operating Income',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Cash Dividends & Other Report"
        description="Comprehensive breakdown of cash dividends and other capital-related items for active FDIC-insured institutions, including preferred and common stock dividends, capital stock changes, and net operating income."
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

