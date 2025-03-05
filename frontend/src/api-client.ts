const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const apiClient = async (url: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {};

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || response.statusText);
  }
  return data;
};

export default apiClient;
