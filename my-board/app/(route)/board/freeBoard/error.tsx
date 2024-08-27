'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        //console.error(error);
        //console.log(`123${error}`);
    }, [error]);



    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h1 className="text-lg font-medium">Something went wrong!</h1>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}