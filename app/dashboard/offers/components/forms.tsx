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
  const oldContent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>

<table><colgroup><col style="width: 267px;"><col style="width: 280px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="267"><p style="text-align: center">fs</p></th><th colspan="1" rowspan="1" colwidth="280"><p style="text-align: center">بيسشبشبشسيب</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="267"><p>بيشب</p></td><td colspan="1" rowspan="1" colwidth="280"><p>بسيبشيب</p></td></tr></tbody></table>


`;
  const [content, setContent] = useState<string>(oldContent);

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
