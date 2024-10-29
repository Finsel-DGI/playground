export async function requestToNextSever(path: string, body?: Record<string, unknown>, options?: RequestInit) {
  const response = await postFetch("/api/" + path, body ?? {}, options);
  const json = await (response).json();
  if (!response.ok) {
    const e = json as { error: string };
    throw new Error(e.error);
  }
  return json;
}

async function postFetch(path: string, body: Record<string, unknown>, options?: RequestInit) {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    ...options
  });
}