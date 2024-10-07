// Uncommon: Handle uncaught errors in the root layout with global-error.js
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-global-errors

'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
return (
  <div>
    <div>Error in the root layout: {error.message}</div>
    <button onClick={reset}>Try again</button>
  </div>
  );
}