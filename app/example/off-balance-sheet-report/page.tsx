'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function OffBalanceSheetReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'OBSDIR',
    'NACDIR',
    'RT',
    'RTNVS',
    'RTFFC',
    'FX',
    'FXNVS',
    'FXFFC',
    'EDCM',
    'UC',
    'UCLOC',
    'UCCRCD',
    'UCCOMRE',
    'UCSC',
    'UCOTHER',
    'SCLENT',
    'OTHOFFBS',
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
      key: 'OBSDIR',
      label: 'Off-BS Derivatives',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'RT',
      label: 'Interest Rate Derivs',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'RTNVS',
      label: 'IR Derivs: Notional',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'FX',
      label: 'FX Derivatives',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'FXNVS',
      label: 'FX Derivs: Notional',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'EDCM',
      label: 'Equity Derivatives',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'UC',
      label: 'Unused Commitments',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'UCLOC',
      label: 'UC: Lines of Credit',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'UCCRCD',
      label: 'UC: Credit Cards',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'UCCOMRE',
      label: 'UC: Comm RE',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'SCLENT',
      label: 'Securities Lending',
      format: formatCurrency,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Off-Balance Sheet Items Report"
        description="Off-balance sheet items including derivatives (interest rate, foreign exchange, equity) and unused commitments (lines of credit, credit cards, commercial real estate)."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="UC"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}

