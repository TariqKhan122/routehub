import type { Location } from "react-router-dom";

export type Role = "admin" | "editor" | "viewer";
export type Status = "active" | "pending" | "suspended";

export interface ActivityItem { id: string; text: string; date: string }

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;     // YYYY-MM-DD
  lastActive: string; // YYYY-MM-DD
  orders: number;
  spend: number;
  activity: ActivityItem[];
}

export interface AuthUser { name: string; email: string }

export type CategorySlug = "engineering" | "design" | "career";
export interface Category { slug: CategorySlug; name: string; description: string }
export interface Author { name: string; role: string }

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: CategorySlug;
  tags: string[];
  author: Author;
  date: string;
  readMinutes: number;
}

// Shape of the router state that ProtectedRoute attaches when it redirects to /login.
export interface RedirectState { from: Location }
