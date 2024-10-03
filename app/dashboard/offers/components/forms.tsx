"use client";
import Form from "@/app/components/reusable-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { newContactAction } from "@/actions/contact";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import RenderHtml from "@/app/components/render-html";
const RichTextEditor = dynamic(
  () => import("@/app/components/rich-text-editor"),
  {
    ssr: false, // Prevent server-side rendering
  }
);
const NewOfferForm = () => {
  const [content, setContent] = useState<string>("");

  return (
    <Form action={newContactAction}>
      <div className="">
        <div>
          <Label htmlFor="to">الى</Label>
          <Input name="to" id="to" required type="text" />
        </div>
        <div>
          <Label htmlFor="title">العنوان</Label>
          <Input name="title" id="title" required type="text" />
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input name="phone" id="phone" required type="tel" />
        </div>

        <div>
          <Suspense fallback={<Skeleton className=" h-10 w-full"></Skeleton>}>
            <Label>المحتوى</Label>
            <div dir="rtl">
              <RichTextEditor content={content} setContent={setContent} />
            </div>{" "}
          </Suspense>
        </div>
        <Button
          type={"button"}
          onClick={() => {
            // console.log(parseEditorStateToHTML(editorState));
          }}
        >
          ok
        </Button>
        <RenderHtml html={content} />
      </div>
    </Form>
  );
};

export { NewOfferForm };
