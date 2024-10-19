// https://sometechblog.com/posts/how-to-easily-test-next-js-loading-and-error-states/

/**
 * Test loading and error layouts for NextJS's app dir.
 * @param searchParams
 * @returns Promise
 */
export const layoutTester = async (searchParams: Record<string, string>) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (typeof searchParams.loading !== "undefined") {
    const loading = parseInt(searchParams.loading || "2000");
    await new Promise((resolve) => setTimeout(resolve, loading));
  }

  if (typeof searchParams.error !== "undefined") {
    const error = searchParams.error || "Something went wrong!";
    await new Promise((_resolve, reject) => reject(Error(error)));
  }
};
