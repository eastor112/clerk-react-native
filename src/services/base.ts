import { apiUrl } from "../environment";

export abstract class APIBase {
  private readonly base = apiUrl;

  protected getPath(path: string): string {
    return `${this.base}${path}`;
  }

  protected defaultHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  protected async fetchResponse(
    path: string,
    init: RequestInit = {},
    token?: string,
    noCache = false
  ): Promise<Response> {
    const url = this.getPath(path);

    const headers = {
      ...this.defaultHeaders(token),
      ...(init.headers as Record<string, string> | undefined),
    };

    const finalInit: RequestInit = {
      ...init,
      headers,
      cache: noCache ? "no-cache" : init.cache,
      body: typeof init.body === "object" && init.body !== null
        ? JSON.stringify(init.body)
        : init.body,
    };

    try {
      const res = await fetch(url, finalInit);

      if (!res.ok) {
        let errorMessage = `Fetch failed (${res.status}): ${res.statusText}`;
        try {
          const errorBody = await res.text();
          errorMessage += `\n${errorBody}`;
        } catch { }
        throw new Error(errorMessage);
      }

      return res;
    } catch (err) {
      console.log("fetch error:", err);
      throw err; // importante propagarlo
    }
  }

  protected async fetchJSON<T = any>(
    path: string,
    init: RequestInit = {},
    token?: string,
    noCache = false
  ): Promise<T> {
    const res = await this.fetchResponse(path, init, token, noCache);
    return res.json();
  }

  protected async fetchBlob(
    path: string,
    init: RequestInit = {},
    token?: string,
    noCache = false
  ): Promise<Blob> {
    const res = await this.fetchResponse(path, init, token, noCache);
    return res.blob();
  }

  protected async fetchText(
    path: string,
    init: RequestInit = {},
    token?: string,
    noCache = false
  ): Promise<string> {
    const res = await this.fetchResponse(path, init, token, noCache);
    return res.text();
  }
}
