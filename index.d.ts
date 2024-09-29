declare interface Project {
  images: string[];
  title: string;
  details?: string;
}

export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
