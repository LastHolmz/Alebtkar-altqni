"use client";
import Form from "@/components/form";
import { loginUserAction } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import LangRenderer from "@/components/lang";

export const LoginForm = ({ href }: { href?: string }) => {
  const { lang } = useParams();

  return (
    <Form
      action={loginUserAction}
      success="تم تسجيل الدخول بنجاح."
      replaceLink={href ? `/${href}` : `/${lang}`}
      submit="تسجيل الدخول"
    >
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="email">
            <LangRenderer ar="البريد الإلكتروني" en="Email" />
          </Label>
          <Input
            name="email"
            id="email"
            placeholder={lang === "ar" ? "ادخل ايميلك" : "Enter your email"}
            required
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password">
            <LangRenderer ar="كلمة المرور" en="Password" />
          </Label>
          <Input
            dir={lang === "ar" ? "rtl" : "ltr"}
            name="password"
            id="password"
            placeholder={
              lang === "ar" ? "ادخل كلمة المرور" : "Enter your password"
            }
            required
            type="password"
          />
        </div>
      </div>
    </Form>
  );
};
