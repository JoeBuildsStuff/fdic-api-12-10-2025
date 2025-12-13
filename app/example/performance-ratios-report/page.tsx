'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatPercentage } from '@/lib/fdic-api';

export default function PerformanceRatiosReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for performance ratios report
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'NTINCL',
    'NTINCHPP',
    'INTINCY',
    'INTEXPY',
    'NIMY',
    'NONIIAY',
    'NONIXAY',
    'ELNATRY',
    'NOIJY',
    'ROA',
    'ROAPTX',
    'ROE',
    'ROEINJR',
    'NTLNLSR',
    'ELNANTR',
    'IDERNCVR',
    'EEFFR',
    'ASTEMPM',
    'EQCDIVNTINC',
    'ERNASTR',
    'LNATRESR',
    'LNRESNCR',
    'NPERFV',
    'NCLNLSR',
    'LNLSNTV',
    'LNLSDEPR',
    'IDLNCORR',
    'DEPDASTR',
    'EQV',
    'RBC1AAJ',
    'CBLRIND',
    'IDTICER',
    'IDTIRWAJR',
    'RBCRWAJ',
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
      key: 'ROA',
      label: 'Return on Assets',
      format: formatPercentage,
      className: 'text-right font-semibold',
    },
    {
      key: 'ROE',
      label: 'Return on Equity',
      format: formatPercentage,
      className: 'text-right font-semibold',
    },
    {
      key: 'NIMY',
      label: 'Net Interest Margin',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'INTINCY',
      label: 'Yield on Earning Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'INTEXPY',
      label: 'Cost of Funding Earning Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'NONIIAY',
      label: 'Noninterest Income to Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'NONIXAY',
      label: 'Noninterest Expense to Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'EEFFR',
      label: 'Efficiency Ratio',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'NTLNLSR',
      label: 'Net Charge-Offs to Loans',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'NCLNLSR',
      label: 'Noncurrent Loans to Loans',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'LNATRESR',
      label: 'Loss Allowance to Loans',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'LNRESNCR',
      label: 'Allowance to Noncurrent Loans',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'LNLSNTV',
      label: 'Net Loans to Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'LNLSDEPR',
      label: 'Net Loans to Deposits',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'EQV',
      label: 'Equity to Assets',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'RBC1AAJ',
      label: 'Leverage Ratio',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'IDTICER',
      label: 'CET1 Capital Ratio',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'IDTIRWAJR',
      label: 'Tier 1 Capital Ratio',
      format: formatPercentage,
      className: 'text-right',
    },
    {
      key: 'RBCRWAJ',
      label: 'Total Capital Ratio',
      format: formatPercentage,
      className: 'text-right',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Performance & Condition Ratios Report"
        description="Comprehensive performance and condition ratios for active FDIC-insured institutions, including profitability metrics, efficiency ratios, asset quality indicators, and capital adequacy measures."
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

