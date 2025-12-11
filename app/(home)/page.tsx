import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          FDIC Bank Data API
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive banking industry data API providing access to financial institution information, 
          historical data, bank failures, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/docs"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
