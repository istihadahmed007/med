// Intelligent Model Prefetching & Idle Cache Warming

const prefetchedUrls = new Set<string>();

/**
 * Checks if the client network allows prefetching (respects Save-Data and slow 2G/3G connections)
 */
export function isPrefetchAllowed(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return false;
  return true;
}

/**
 * Warms the browser HTTP cache for a model asset using low-priority fetch
 */
export function prefetchModel(url: string): void {
  if (!isPrefetchAllowed()) return;
  if (!url || prefetchedUrls.has(url)) return;

  prefetchedUrls.add(url);

  try {
    const fullUrl = url.startsWith("http") ? url : `${import.meta.env.BASE_URL.replace(/\/$/, "")}${url}`;
    void fetch(fullUrl, { priority: "low" } as RequestInit).catch(() => {
      // Background prefetch error is non-critical and swallowed
    });
  } catch {
    // Ignore environments where fetch is unavailable
  }
}

/**
 * Queues a list of model URLs to be prefetched progressively during browser idle time
 */
export function queueIdlePrefetch(urls: string[]): void {
  if (!isPrefetchAllowed() || !urls.length) return;

  const runIdle = (index: number) => {
    if (index >= urls.length) return;
    const scheduleNext = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          prefetchModel(urls[index]);
          runIdle(index + 1);
        }, { timeout: 3000 });
      } else {
        setTimeout(() => {
          prefetchModel(urls[index]);
          runIdle(index + 1);
        }, 1000);
      }
    };
    scheduleNext();
  };

  runIdle(0);
}
