export type methods = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
interface IApi {
  url: string;
  method: methods;
  body?: any;
  access_token?: string;
}

export async function apiFetch<T>({
  url,
  method,
  body,
  access_token,
}: IApi): Promise<T> {
  const config = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };
  if (method !== "GET" && method !== "DELETE" && body) {
    Object.assign(config, { body: JSON.stringify(body) });
  }
  if (access_token) {
    Object.assign(config, {
      headers: {
        ...config.headers,
        Authorization: access_token.includes("Bearer")
          ? `${access_token}`
          : `Bearer ${access_token}`,
      },
    });
  }

  const response = await fetch(url, config);
  const data = await response.json();
  return data;
}
