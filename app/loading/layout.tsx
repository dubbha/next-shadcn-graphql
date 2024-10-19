/**
 * In dev env, to test the loading and error states simple add the parameters to the page URL:
 * http://localhost:3000/loading?loading
 * http://localhost:3000/loading?loading=10000 (duration in ms)
 * http://localhost:3000/loading?error
 * http://localhost:3000/loading?error="Custom error message"
 * http://localhost:3000/loading?loading=5000&error="Custom error message"
 */

import Image from "next/image";

export default function LoadingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {children}
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
