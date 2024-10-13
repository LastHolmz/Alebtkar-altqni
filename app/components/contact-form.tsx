"use client";
import { Input } from "@/components/ui/input";
import { newContactAction } from "@/actions/contact";
import { Textarea } from "@/components/ui/textarea";
import Form from "./reusable-form";
import { Label } from "@/components/ui/label";
import SubmitButton from "./custom-submit-btn";

const ContactUsForm = () => {
  return (
    <Form action={newContactAction} dontReplace>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم</Label>
          <Input
            required
            placeholder="اسمك"
            type="text"
            name="fullName"
            id="fullName"
            className="mt-2"
          />
          <span className=" text-xs mt-1">ادخل اسمك هنا</span>
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            dir="rtl"
            required
            placeholder="رقم هاتفك"
            type="tel"
            name="phone"
            id="phone"
            className="mt-2"
          />
          <span className=" text-xs mt-1">ادخل رقم هاتفك هنا</span>
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            required
            placeholder="بريدك الإلكتروني"
            type="email"
            name="email"
            id="email"
            className="mt-2"
          />
          <span className=" text-xs mt-1">ادخل بريدك الإلكتروني هنا</span>
        </div>
        <div>
          <Label htmlFor="content">المحتوى</Label>
          <Textarea
            name={"content"}
            required
            placeholder="ادخل المحتوى الخاص بك"
            id="content"
            className="mt-2"
          />
          <span className=" text-xs mt-1">
            يمكنك إدخال أي ملاحظات أو تفاصيل هنا
          </span>
        </div>
      </div>
      <SubmitButton type={"submit"} className="mt-2">
        ارسال
      </SubmitButton>
    </Form>
  );
};

export default ContactUsForm;
