import Link from 'next/link';

export default function ExampleReportsPage() {
  const reports = [
    {
      title: 'Total Assets Report',
      href: '/example/total-assets-report',
      description: 'Comprehensive breakdown of total assets including cash, securities, loans, trading assets, bank premises, ORE, intangibles, and other assets.',
    },
    {
      title: 'Liabilities and Capital Report',
      href: '/example/liabilities-capital-report',
      description: 'Total liabilities and equity capital breakdown including deposits, borrowed funds, and equity components.',
    },
    {
      title: 'Past Due and Nonaccrual Assets',
      href: '/example/past-due-nonaccrual-report',
      description: 'Assets past due 30-89 days, 90+ days, and in nonaccrual status with breakdowns by loan type.',
    },
    {
      title: 'Loss-Sharing Agreements',
      href: '/example/loss-sharing-report',
      description: 'Assets covered by loss-sharing agreements with the FDIC, including loans and leases by type.',
    },
    {
      title: 'Off-Balance Sheet Items',
      href: '/example/off-balance-sheet-report',
      description: 'Derivatives and unused commitments including interest rate, FX, and equity derivatives.',
    },
    {
      title: 'Fiduciary Services',
      href: '/example/fiduciary-report',
      description: 'Fiduciary powers, accounts, assets under management, and income from fiduciary services.',
    },
    {
      title: 'Assets Sold and Securitized',
      href: '/example/assets-sold-securitized-report',
      description: 'Assets sold and securitized by loan type including residential, HEL, credit cards, auto, C&I, and other loans.',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">FDIC Standard Reports - Examples</h1>
        <p className="text-lg text-fd-muted-foreground">
          Interactive examples demonstrating the FDIC Bank Data API with live data tables.
          Select a report to view real-time data from the FDIC API.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <Link
            key={report.href}
            href={report.href}
            className="block p-6 border rounded-lg hover:bg-fd-muted/30 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
            <p className="text-sm text-fd-muted-foreground">{report.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 border rounded-lg bg-fd-muted/30">
        <h3 className="text-lg font-semibold mb-2">About These Examples</h3>
        <p className="text-sm text-fd-muted-foreground mb-4">
          These interactive examples fetch live data from the FDIC Bank Data API and display it in
          searchable, sortable data tables. You can:
        </p>
        <ul className="text-sm text-fd-muted-foreground list-disc list-inside space-y-1">
          <li>Select different report dates (quarter-end dates)</li>
          <li>Search and filter the data</li>
          <li>View formatted currency values</li>
          <li>Navigate through paginated results</li>
        </ul>
        <p className="text-sm text-fd-muted-foreground mt-4">
          For API documentation, visit the{' '}
          <Link href="/docs" className="text-fd-primary hover:underline">
            documentation section
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

