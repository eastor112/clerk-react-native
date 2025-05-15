import { apiUrl } from "../environment";

export abstract class APIBase {
  /** Base URL for all requests */
  private readonly base = apiUrl;

  /** Build the full URL from a relative path */
  protected getPath(path: string): string {
    return `${this.base}${path}`;
  }

  /** Generates default headers: JSON content type + Bearer if token is provided */
  private defaultHeaders(token?: string): Headers {
    const headers = new Headers({ "Content-Type": "application/json" });
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * Core fetch that returns the raw Response.
   *
   * @param request   Can be a URL string or Request object
   * @param token?    Optional Bearer token
   * @param headers?  Optional headers; if omitted, uses defaultHeaders(token)
   * @param noCache?  If true, forces 'no-cache' policy
   */
  protected async fetchResponse(
    request: RequestInfo,
    token?: string,
    headers: Headers = this.defaultHeaders(token),
    noCache: boolean = false
  ): Promise<Response> {
    const res = await fetch(
      typeof request === "string" ? this.getPath(request) : request,
      {
        headers,
        cache: noCache ? "no-cache" : undefined,
      }
    );
    if (!res.ok) {
      throw new Error(`Fetch failed (${res.status}): ${res.statusText}`);
    }
    return res;
  }

  /**
   * Fetches and returns parsed JSON.
   */
  protected async fetchJSON<T = any>(
    request: RequestInfo,
    token?: string,
    headers: Headers = this.defaultHeaders(token),
    noCache: boolean = false
  ): Promise<T> {
    const res = await this.fetchResponse(request, token, headers, noCache);
    return res.json();
  }

  /**
   * Fetches and returns a Blob.
   */
  protected async fetchBlob(
    request: RequestInfo,
    token?: string,
    headers: Headers = this.defaultHeaders(token),
    noCache: boolean = false
  ): Promise<Blob> {
    const res = await this.fetchResponse(request, token, headers, noCache);
    return res.blob();
  }

  /**
   * Fetches and returns plain text.
   */
  protected async fetchText(
    request: RequestInfo,
    token?: string,
    headers: Headers = this.defaultHeaders(token),
    noCache: boolean = false
  ): Promise<string> {
    const res = await this.fetchResponse(request, token, headers, noCache);
    return res.text();
  }
}
