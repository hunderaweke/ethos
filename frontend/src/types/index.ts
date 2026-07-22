export type ItemType = "book" | "youtube" | "podcast" | "essay" | "x" | "design";

export interface CurationItem {
  id: string;
  type: ItemType;
  title: string;
  author?: string;
  creator?: string;
  host?: string;
  handle?: string;
  image?: string;
  description: string;
  impact: string;
  tags: string[];
  link: string;
  subscribers?: string;
  episodes?: string;
  readTime?: string;
  followers?: string;
  size?: "small" | "medium" | "large";
}

export interface HandleSettings {
  handle: string;
  displayName: string;
  bio: string;
  location: string;
  skills: string;
  isVerified: boolean;
  isPublic: boolean;
}

export type AuthMode = "login" | "signup";

export type DashboardTab = "items" | "analytics" | "settings" | "integrations";
