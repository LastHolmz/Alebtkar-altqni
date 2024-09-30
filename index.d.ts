export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  interface Project {
    images: string[];
    title: string;
    details?: string;
  }
  interface Demo {
    image: string;
    price?: number;
    title: string;
    href: string;
    bio: string;
    description?: string;
  }
}
