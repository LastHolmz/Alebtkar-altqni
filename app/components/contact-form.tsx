"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { newContactAction } from "@/actions/contact";
import { useFormState } from "react-dom";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./custom-submit-btn";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  fullName: z.string().min(6, {
    message: "الاسم يجب ان لا يقل على 6 احرف",
  }),
  phone: z
    .string()
    .min(9, { message: "يجب ان لا يقل رقم الهاتف عن 9 ارقام" })
    .regex(/^(092|091|094|093|92|91|94|93)\d{7}$/, {
      message: "يجب تقديم رقم هاتف 92|91|93|94",
    }),
  content: z.string(),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح",
  }), // Added email validation here
});

export default function ContactForm() {
  const [msg, dispatch] = useFormState(newContactAction, { message: "" });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "", // Added email default value
      content: "",
    },
  });

  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //     toast({
  //       title: msg.message,
  //     });
  //   }

  return (
    <Form {...form}>
      <form
        action={async (e) => {
          await dispatch(e);
          toast({
            title: msg.message,
            className: cn(
              msg.message ===
                "تم الإرسال بنجاح سيتم الرد باسرع وقت ان شاء الله" &&
                "bg-green-500 text-white"
            ),
          });
        }}
      >
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6"> */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input placeholder="ادخل اسمك" {...field} />
                </FormControl>
                <FormDescription>ادخل اسمك هنا</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input
                    dir="rtl"
                    placeholder="ادخل رقم هاتفك"
                    {...field}
                    type="tel"
                  />
                </FormControl>
                <FormDescription>ادخل رقم هاتفك هنا</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ادخل بريدك الإلكتروني"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormDescription>ادخل بريدك الإلكتروني هنا</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"content"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>المحتوى</FormLabel>
                <FormControl>
                  <Textarea placeholder="ادخل المحتوى الخاص بك" {...field} />
                </FormControl>
                <FormDescription>
                  يمكنك إدخال أي ملاحظات أو تفاصيل هنا
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton type={"submit"} className="mt-2">
          ارسال
        </SubmitButton>
      </form>
    </Form>
  );
}
