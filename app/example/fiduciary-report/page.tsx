'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function FiduciaryReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'TRPOWER',
    'TREXER',
    'TRACT',
    'TFRA',
    'TTMA',
    'TPMA',
    'TECMA',
    'TORMA',
    'TCAMA',
    'TTNANUM',
    'TPMANUM',
    'TECMANUM',
    'IFIDUC',
    'TPINI',
    'TENI',
    'TONI',
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
      key: 'TRPOWER',
      label: 'Powers Granted',
      format: (v: unknown) => (Number(v) === 1 ? 'Yes' : 'No'),
    },
    {
      key: 'TREXER',
      label: 'Powers Exercised',
      format: (v: unknown) => (Number(v) === 1 ? 'Yes' : 'No'),
    },
    {
      key: 'TFRA',
      label: 'Total Fiduciary Assets',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
    {
      key: 'TTMA',
      label: 'Total Managed Assets',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'TPMA',
      label: 'Personal Managed',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'TECMA',
      label: 'Employee Benefit Managed',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'TTNANUM',
      label: 'Total Accounts',
      format: (v: unknown) => v ? Number(v).toLocaleString() : '—',
      className: 'text-right',
    },
    {
      key: 'IFIDUC',
      label: 'Fiduciary Income',
      format: formatCurrency,
      className: 'text-right font-semibold',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Fiduciary and Related Services Report"
        description="Fiduciary powers, accounts, assets under management, and income from fiduciary services for active FDIC-insured institutions."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="TFRA"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}


