'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';
import { formatCurrency } from '@/lib/fdic-api';

export default function AssetsSoldSecuritizedReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  const fields = [
    'CERT',
    'RSSDHCR',
    'NAMEFULL',
    'CITY',
    'STALP',
    'ZIP',
    'REPDTE',
    'SZLNRES',
    'SZISLRES',
    'SZ30RES',
    'SZ90RES',
    'SZLNHEL',
    'SZISLHEL',
    'SZ30HEL',
    'SZ90HEL',
    'SZLNCRCD',
    'SZISLCCD',
    'SZ30CRCD',
    'SZ90CRCD',
    'SZLAUTO',
    'SZISLAUT',
    'SZ30AUTO',
    'SZ90AUTO',
    'SZLNCI',
    'SZISLCI',
    'SZ30CI',
    'SZ90CI',
    'SZLNOTH',
    'SZISLOTH',
    'SZ30OTH',
    'SZ90OTH',
    'ENCERES',
    'ENCEAUTO',
    'ENCECON',
    'ENCECI',
    'ENCEOTH',
    'ASDRRES',
    'ASCERES',
    'ASDROTH',
    'ASCEOTH',
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
      key: 'SZLNRES',
      label: 'Residential Loans Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SZ30RES',
      label: 'Res: PD 30-89',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'SZ90RES',
      label: 'Res: PD 90+',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'SZLNHEL',
      label: 'HEL Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SZLNCRCD',
      label: 'Credit Cards Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SZLAUTO',
      label: 'Auto Loans Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SZLNCI',
      label: 'C&I Loans Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'SZLNOTH',
      label: 'Other Loans Sold',
      format: formatCurrency,
      className: 'text-right',
    },
    {
      key: 'ENCERES',
      label: 'Max Credit Exp: Res',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'ENCECI',
      label: 'Max Credit Exp: C&I',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
    {
      key: 'ASDRRES',
      label: 'Sold w/ Recourse: Res',
      format: formatCurrency,
      className: 'text-right text-xs',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Assets Sold and Securitized Report"
        description="Assets sold and securitized by loan type (residential, HEL, credit cards, auto, C&I, other), including past due amounts, maximum credit exposure, and assets sold with recourse."
        filters={filters}
        fields={fields}
        columns={columns}
        defaultSortBy="SZLNRES"
        defaultSortOrder="DESC"
        limit={1000}
      />
    </div>
  );
}
