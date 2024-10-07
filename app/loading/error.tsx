'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
return (
  <div>
    <div>{error.message}</div>
    <button onClick={reset}>
      Try again
    </button>
  </div>
  );
}