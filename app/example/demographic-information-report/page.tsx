'use client';

import { FDICReportViewer } from '@/components/fdic-report-viewer';

export default function DemographicInformationReport() {
  const filters = 'ACTIVE:1 AND !(BKCLASS:NC)';
  
  // Key fields for demographic information report
  const fields = [
    'ACTIVE',
    'BKCLASS',
    'CALLFORM',
    'CB',
    'CBSA',
    'CERT',
    'CITY',
    'EFFDATE',
    'ESTYMD',
    'FDICDBS',
    'FDICDBSDESC',
    'FDICSUPV',
    'FDICSUPVDESC',
    'FED',
    'FEDDESC',
    'FLDOFF',
    'INSAGNT1',
    'INSDATE',
    'MUTUAL',
    'NAME',
    'NAMEFULL',
    'NAMEHCR',
    'OCCDIST',
    'OCCDISTDESC',
    'OFFDOM',
    'OFFFOR',
    'OFFOA',
    'OTSREGNM',
    'PARCERT',
    'QBPRCOMLDESC',
    'REGAGNT',
    'REPDTE',
    'RSSDHCR',
    'RSSDID',
    'SPECGRP',
    'SPECGRPDESC',
    'STALP',
    'STCNTY',
    'SUBCHAPS',
    'TRUST',
    'ZIP',
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
      key: 'NAMEHCR',
      label: 'Bank Holding Company',
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
      key: 'ZIP',
      label: 'Zip',
      className: 'font-mono text-xs',
    },
    {
      key: 'STCNTY',
      label: 'County',
    },
    {
      key: 'CBSA',
      label: 'MSA/CBSA',
    },
    {
      key: 'OFFDOM',
      label: 'Domestic Offices',
      className: 'text-right',
    },
    {
      key: 'OFFFOR',
      label: 'Foreign Offices',
      className: 'text-right',
    },
    {
      key: 'OFFOA',
      label: 'Other Area Offices',
      className: 'text-right',
    },
    {
      key: 'BKCLASS',
      label: 'Charter Class',
      className: 'font-mono text-xs',
    },
    {
      key: 'REGAGNT',
      label: 'Regulator',
      className: 'font-mono text-xs',
    },
    {
      key: 'FDICSUPVDESC',
      label: 'FDIC Supervisory Region',
    },
    {
      key: 'FEDDESC',
      label: 'Fed District',
    },
    {
      key: 'OCCDISTDESC',
      label: 'OCC District',
    },
    {
      key: 'ESTYMD',
      label: 'Established Date',
      className: 'font-mono text-xs',
    },
    {
      key: 'INSDATE',
      label: 'Insurance Date',
      className: 'font-mono text-xs',
    },
    {
      key: 'MUTUAL',
      label: 'Mutual',
      className: 'text-center',
    },
    {
      key: 'CB',
      label: 'Community Bank',
      className: 'text-center',
    },
    {
      key: 'TRUST',
      label: 'Trust Powers',
      className: 'text-center',
    },
    {
      key: 'SUBCHAPS',
      label: 'S-Corp',
      className: 'text-center',
    },
    {
      key: 'SPECGRPDESC',
      label: 'Asset Concentration',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FDICReportViewer
        title="Demographic Information Report"
        description="Comprehensive demographic and structural information for active FDIC-insured institutions, including geographic location, office counts, regulatory assignments, charter class, and organizational structure."
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

