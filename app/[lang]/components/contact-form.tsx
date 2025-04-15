"use client";

import { Input } from "@/components/ui/input";
import { newContactAction } from "@/actions/contact";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Form from "@/components/form";

const translations = {
  ar: {
    submit: "ارسال",
    fullName: "الاسم",
    fullNamePlaceholder: "اسمك",
    fullNameHint: "ادخل اسمك هنا",
    phone: "رقم الهاتف",
    phonePlaceholder: "رقم هاتفك",
    phoneHint: "ادخل رقم هاتفك هنا",
    email: "البريد الإلكتروني",
    emailPlaceholder: "بريدك الإلكتروني",
    emailHint: "ادخل بريدك الإلكتروني هنا",
    content: "المحتوى",
    contentPlaceholder: "ادخل المحتوى الخاص بك",
    contentHint: "يمكنك إدخال أي ملاحظات أو تفاصيل هنا",
  },
  en: {
    submit: "Send",
    fullName: "Full Name",
    fullNamePlaceholder: "Your name",
    fullNameHint: "Enter your full name",
    phone: "Phone Number",
    phonePlaceholder: "Your phone number",
    phoneHint: "Enter your phone number",
    email: "Email",
    emailPlaceholder: "Your email address",
    emailHint: "Enter your email address",
    content: "Message",
    contentPlaceholder: "Enter your message",
    contentHint: "You can enter any notes or details here",
  },
};

const ContactUsForm = ({ locale = "ar" }: { locale?: "ar" | "en" }) => {
  const t = translations[locale];

  return (
    <Form action={newContactAction} dontReplace submit={t.submit}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            required
            placeholder={t.fullNamePlaceholder}
            type="text"
            name="fullName"
            id="fullName"
            className="mt-2"
          />
          <span className="text-xs mt-1">{t.fullNameHint}</span>
        </div>

        <div>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            dir={locale === "ar" ? "rtl" : "ltr"}
            required
            placeholder={t.phonePlaceholder}
            type="tel"
            name="phone"
            id="phone"
            className="mt-2"
          />
          <span className="text-xs mt-1">{t.phoneHint}</span>
        </div>

        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            required
            placeholder={t.emailPlaceholder}
            type="email"
            name="email"
            id="email"
            className="mt-2"
          />
          <span className="text-xs mt-1">{t.emailHint}</span>
        </div>

        <div>
          <Label htmlFor="content">{t.content}</Label>
          <Textarea
            name="content"
            required
            placeholder={t.contentPlaceholder}
            id="content"
            className="mt-2"
          />
          <span className="text-xs mt-1">{t.contentHint}</span>
        </div>
      </div>
    </Form>
  );
};

export default ContactUsForm;
