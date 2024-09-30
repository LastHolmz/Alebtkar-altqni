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
}
