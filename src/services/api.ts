const API_BASE = "http://localhost/server/public";

async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null as unknown as T;
  return res.json() as Promise<T>;
}

// Interns
import type { Intern } from "../Types/intern";
import type { Nss } from "../Types/nss";

export const getInterns = () => request<Intern[]>("/interns");
export const createIntern = (data: Partial<Intern>) =>
  request<{ id: number; message: string }>("/interns", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateIntern = (id: number, data: Partial<Intern>) =>
  request<{ message: string }>(`/interns/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteIntern = (id: number) =>
  request<{ message: string }>(`/interns/${id}/delete`, { method: "POST" });

// NSS
export const getNss = () => request<Nss[]>("/nss");
export const createNss = (data: Partial<Nss>) =>
  request<{ id: number; message: string }>("/nss", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateNss = (id: number, data: Partial<Nss>) =>
  request<{ message: string }>(`/nss/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteNss = (id: number) =>
  request<{ message: string }>(`/nss/${id}/delete`, { method: "POST" });

// Auth (for later)
export const login = (username: string, password: string) =>
  request<{ message: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
export const logout = () =>
  request<{ message: string }>("/auth/logout", { method: "POST" });
export const checkAuth = () => request<{ authenticated: true }>("/auth/check");
