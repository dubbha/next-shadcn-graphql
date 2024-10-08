// Common: Handle uncaught errors below the root layout with error.js
// https://nextjs.org/docs/app/building-your-application/routing/error-handling

'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
return (
  <div>
    <div>Error below the root layout: {error.message}</div>
              <button onClick={reset}>Try again</button>
  </div>
  );
}