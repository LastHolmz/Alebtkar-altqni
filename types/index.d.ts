declare interface UserSession {
  id: string;
  fullName: string;
  role: "admin" | "superAdmin";
  email: string;
}

declare type nullable = null | undefined;

declare type variants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
declare type VisibilityState = {
  [x: string]: boolean;
};

declare type Locale = "ar" | "en";
