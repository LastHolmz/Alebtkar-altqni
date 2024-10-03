export type Roles = "admin" | "moderator";
export type Action = (
  prevState: { message: string },
  formData: FormData
) => Promise<{ message: string }>;

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
    href?: string;
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
