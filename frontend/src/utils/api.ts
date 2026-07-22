export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface LinkPreview {
  platform: string;
  title?: string | null;
  image_url?: string | null;
  description?: string | null;
  creator_name?: string | null;
  suggested_type?: string | null;
  resource_kind?: string | null;
  follower_count?: string | null;
}

export async function fetchLinkPreview(url: string, signal?: AbortSignal): Promise<LinkPreview | null> {
  try {
    const res = await fetch(`${API_BASE}/link-preview?url=${encodeURIComponent(url)}`, { signal });
    if (!res.ok) return null;
    return (await res.json()) as LinkPreview;
  } catch {
    return null;
  }
}

export interface ApiProfile {
  id: string;
  handle: string;
  display_name: string;
  bio: string;
  location: string;
  skills: string;
  avatar_url: string | null;
  banner_url: string | null;
  is_verified: boolean;
  is_public: boolean;
  follower_count: number;
  view_count: number;
  curator_score: number | null;
}

export interface ApiItem {
  id: string;
  profile_id: string;
  type: string;
  resource_kind: string | null;
  title: string;
  creator_name: string | null;
  link: string;
  description: string;
  impact: string;
  image_url: string | null;
  tags: string[];
  size: "small" | "medium" | "large";
  metadata: Record<string, unknown>;
  is_pinned: boolean;
  view_count: number;
  save_count: number;
  click_count: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  has_more: boolean;
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function apiUpload<T>(path: string, file: File): Promise<T> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail || res.statusText);
  }
  return (await res.json()) as T;
}

export { ApiError };

export function getPublicProfile(handle: string): Promise<ApiProfile> {
  return apiFetch(`/profiles/${encodeURIComponent(handle)}`);
}

export function getPublicItems(
  handle: string,
  filters: { type?: string; kind?: string; tag?: string; q?: string; page?: number; limit?: number } = {}
): Promise<PaginatedResponse<ApiItem>> {
  const params = new URLSearchParams();
  if (filters.type && filters.type !== "all") params.set("type", filters.type);
  if (filters.kind && filters.kind !== "all") params.set("kind", filters.kind);
  if (filters.tag && filters.tag !== "all") params.set("tag", filters.tag);
  if (filters.q) params.set("q", filters.q);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return apiFetch(`/profiles/${encodeURIComponent(handle)}/items${qs ? `?${qs}` : ""}`);
}

export function followProfile(handle: string): Promise<void> {
  return apiFetch(`/profiles/${encodeURIComponent(handle)}/follow`, { method: "POST" });
}

export function unfollowProfile(handle: string): Promise<void> {
  return apiFetch(`/profiles/${encodeURIComponent(handle)}/follow`, { method: "DELETE" });
}

export function saveItem(itemId: string): Promise<void> {
  return apiFetch(`/items/${itemId}/save`, { method: "POST" });
}

export function unsaveItem(itemId: string): Promise<void> {
  return apiFetch(`/items/${itemId}/save`, { method: "DELETE" });
}

export function recordItemClick(itemId: string): Promise<void> {
  return apiFetch(`/items/${itemId}/click`, { method: "POST" });
}

export function getMe(): Promise<{ user: { id: string; email: string; avatar_url: string | null }; profile: ApiProfile | null }> {
  return apiFetch(`/auth/me`);
}

export function googleAuth(idToken: string, claimHandle?: string) {
  return apiFetch<{ user: { id: string; email: string; avatar_url: string | null }; profile: ApiProfile | null }>(
    `/auth/google`,
    { method: "POST", body: JSON.stringify({ id_token: idToken, claim_handle: claimHandle }) }
  );
}

export function logout(): Promise<void> {
  return apiFetch(`/auth/logout`, { method: "POST" });
}

export function getMyItems(
  filters: { type?: string; kind?: string; tag?: string; q?: string; page?: number; limit?: number } = {}
): Promise<PaginatedResponse<ApiItem>> {
  const params = new URLSearchParams();
  if (filters.type && filters.type !== "all") params.set("type", filters.type);
  if (filters.kind && filters.kind !== "all") params.set("kind", filters.kind);
  if (filters.tag && filters.tag !== "all") params.set("tag", filters.tag);
  if (filters.q) params.set("q", filters.q);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return apiFetch(`/items/me${qs ? `?${qs}` : ""}`);
}

export interface ItemInput {
  type: string;
  resource_kind?: string;
  title: string;
  creator_name?: string;
  link: string;
  description?: string;
  impact?: string;
  image_url?: string;
  tags?: string[];
  size?: string;
  metadata?: Record<string, unknown>;
}

export function createItem(data: ItemInput): Promise<ApiItem> {
  return apiFetch(`/items`, { method: "POST", body: JSON.stringify(data) });
}

export function updateItem(id: string, data: Partial<ItemInput>): Promise<ApiItem> {
  return apiFetch(`/items/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export function deleteItem(id: string): Promise<void> {
  return apiFetch(`/items/${id}`, { method: "DELETE" });
}

export function toggleItemPin(id: string): Promise<ApiItem> {
  return apiFetch(`/items/${id}/pin`, { method: "PATCH" });
}

export function getMyProfile(): Promise<ApiProfile> {
  return apiFetch(`/profiles/me`);
}

export function updateMyProfile(data: Partial<{
  handle: string;
  display_name: string;
  bio: string;
  location: string;
  skills: string;
  avatar_url: string;
  is_public: boolean;
}>): Promise<ApiProfile> {
  return apiFetch(`/profiles/me`, { method: "PATCH", body: JSON.stringify(data) });
}

export function checkHandleAvailability(handle: string): Promise<{ handle: string; available: boolean }> {
  return apiFetch(`/handles/${encodeURIComponent(handle)}/availability`);
}

export function uploadAvatar(file: File): Promise<ApiProfile> {
  return apiUpload(`/profiles/me/avatar`, file);
}

export function uploadBanner(file: File): Promise<ApiProfile> {
  return apiUpload(`/profiles/me/banner`, file);
}

export function createProfile(handle: string, displayName: string): Promise<ApiProfile> {
  return apiFetch(`/profiles`, {
    method: "POST",
    body: JSON.stringify({ handle, display_name: displayName }),
  });
}

export interface AnalyticsSummary {
  total_shelf_views: number;
  community_saves: number;
  curator_score: number | null;
  active_items: number;
}

export interface CategoryBreakdown {
  type: string;
  item_count: number;
  view_count: number;
  share_pct: number;
}

export interface LeaderboardItem {
  id: string;
  title: string;
  save_count: number;
  view_count: number;
}

export function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return apiFetch(`/analytics/me/summary`);
}

export function getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
  return apiFetch(`/analytics/me/category-breakdown`);
}

export function getLeaderboard(limit = 10): Promise<LeaderboardItem[]> {
  return apiFetch(`/analytics/me/leaderboard?limit=${limit}`);
}

export function toCurationItem(item: ApiItem): import("../types").CurationItem {
  const metadata = item.metadata || {};
  return {
    id: item.id,
    type: item.type as import("../types").ItemType,
    resourceKind: (item.resource_kind ?? undefined) as import("../types").ResourceKind | undefined,
    title: item.title,
    author: item.creator_name ?? undefined,
    creator: item.creator_name ?? undefined,
    host: item.creator_name ?? undefined,
    handle: item.creator_name ?? undefined,
    image: item.image_url ?? undefined,
    description: item.description,
    impact: item.impact,
    tags: item.tags,
    link: item.link,
    subscribers: typeof metadata.subscribers === "string" ? metadata.subscribers : undefined,
    episodes: typeof metadata.episodes === "string" ? metadata.episodes : undefined,
    readTime: typeof metadata.readTime === "string" ? metadata.readTime : undefined,
    followers: typeof metadata.followers === "string" ? metadata.followers : undefined,
    size: item.size,
  };
}

export function toHandleSettings(profile: ApiProfile): import("../types").HandleSettings {
  return {
    handle: `@${profile.handle}`,
    displayName: profile.display_name,
    bio: profile.bio,
    location: profile.location,
    skills: profile.skills,
    isVerified: profile.is_verified,
    isPublic: profile.is_public,
    avatarUrl: profile.avatar_url ?? undefined,
    bannerUrl: profile.banner_url ?? undefined,
  };
}

export function handleSettingsToPatch(settings: import("../types").HandleSettings) {
  return {
    handle: settings.handle.replace(/^@/, "").toLowerCase(),
    display_name: settings.displayName,
    bio: settings.bio,
    location: settings.location,
    skills: settings.skills,
    is_public: settings.isPublic,
  };
}
