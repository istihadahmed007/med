export interface SafeApiResponse<T> {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
  kind?: "http" | "format" | "timeout" | "network" | "cancelled";
}
/** No response bodies, server messages or native parser errors cross this boundary.
 * Timeout covers both headers and body; browser CORS and offline errors are indistinguishable.
 */
export async function safeFetchJson<T>(
  url: string,
  options: RequestInit = {},
  timeoutMs = 6000,
): Promise<SafeApiResponse<T>> {
  const controller = new AbortController();
  let timedOut = false;
  let status = 0;
  const abort = () => controller.abort();
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted) abort();
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    status = response.status;
    if (!response.ok)
      return {
        ok: false,
        status,
        data: null,
        kind: "http",
        error:
          status === 404
            ? "Video service not found."
            : status >= 500
              ? "Video service is temporarily unavailable."
              : "Video request could not be completed.",
      };
    const type = (response.headers.get("Content-Type") || "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    if (
      type !== "application/json" &&
      !/^application\/[\w.-]+\+json$/.test(type)
    )
      return {
        ok: false,
        status,
        data: null,
        kind: "format",
        error: "Video service returned an unsupported response.",
      };
    // Parse only JSON-labelled bodies; reject mislabeled HTML without exposing its contents.
    const body = await response.text();
    if (!body.trim() || body.trimStart().startsWith("<"))
      return {
        ok: false,
        status,
        data: null,
        kind: "format",
        error: "Video service returned an unsupported response.",
      };
    try {
      return { ok: true, status, data: JSON.parse(body) as T };
    } catch {
      return {
        ok: false,
        status,
        data: null,
        kind: "format",
        error: "Video service returned invalid data.",
      };
    }
  } catch {
    return {
      ok: false,
      status,
      data: null,
      kind: timedOut
        ? "timeout"
        : controller.signal.aborted
          ? "cancelled"
          : "network",
      error: timedOut
        ? "Video request timed out. Please try again."
        : controller.signal.aborted
          ? "Video request cancelled."
          : "Video service could not be reached. Check your connection or try the official source.",
    };
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", abort);
  }
}
