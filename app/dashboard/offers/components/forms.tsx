"use client";
import Form from "@/app/components/reusable-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Suspense, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import RenderHtml from "@/app/components/render-html";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ListForOffer } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubmitButton from "@/app/components/custom-submit-btn";
import { newOfferAction } from "../actions";
const RichTextEditor = dynamic(
  () => import("@/app/components/rich-text-editor"),
  {
    ssr: false, // Prevent server-side rendering
  }
);

type ListOffer = Omit<
  ListForOffer,
  "id" | "createdAt" | "updatedAt" | "offerId"
>;

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
  const [showOutput, setShowOutput] = useState(true);
  const [features, setFeatures] = useState<ListOffer[]>([]);
  const [feature, setFeature] = useState<ListOffer | undefined>({
    type: "optional",
    period: 3,
    price: 100,
    selected: false,
    title: "العنوان",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const addFeature = (val: ListOffer) => {
    if (!val) return;
    setFeatures((prev) => [...prev, val]);
    setFeature({
      type: "optional",
      period: 0,
      price: 0,
      selected: false,
      title: "",
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const removeFeature = (val: string) => {
    let newFeatures: ListOffer[] = [];
    features.map((f) => {
      if (f.title !== val) {
        newFeatures = [...newFeatures, f];
      }
    });
    setFeatures(newFeatures);
  };
  return (
    <Form action={newOfferAction} replaceLink="/dashboard/offers">
      <Input type={"hidden"} name="content" value={content} />
      <Input type={"hidden"} name="list" value={JSON.stringify(features)} />
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
          <Label htmlFor="email">email</Label>
          <Input name="email" id="email" required type="email" />
        </div>

        {/* features */}
        <div>
          <div>
            <Label htmlFor="features">مميزات العرض</Label>
            <Dialog>
              <DialogTrigger>
                <Input />
              </DialogTrigger>
              <DialogContent>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="ادخل العنوان"
                  value={feature?.title}
                  onChange={(e) =>
                    setFeature((prev) => {
                      if (prev) {
                        return { ...prev, title: e.target.value };
                      }
                    })
                  }
                />
                <Input
                  ref={inputRef}
                  type="number"
                  placeholder="ادخل السعر"
                  value={String(feature?.price)}
                  onChange={(e) =>
                    setFeature((prev) => {
                      if (prev) {
                        return { ...prev, price: Number(e.target.value) };
                      }
                    })
                  }
                />
                <Input
                  ref={inputRef}
                  type="number"
                  placeholder="ادخل المدة"
                  value={String(feature?.period)}
                  onChange={(e) =>
                    setFeature((prev) => {
                      if (prev) {
                        return { ...prev, period: Number(e.target.value) };
                      }
                    })
                  }
                />
                <Button
                  type={"button"}
                  onClick={() => {
                    if (feature) {
                      addFeature(feature);
                    }
                  }}
                >
                  اضف
                </Button>
                {/*   // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     addFeature(feature);
                  //     e.preventDefault();
                  //   }
                  // }} */}
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex min-h-20 my-2 justify-start bg-background border rounded-lg px-4 py-2 items-center flex-wrap">
            {features?.map((feature, index) => (
              <Feature
                removeFeature={removeFeature}
                value={feature}
                key={index}
              />
            ))}
          </div>
        </div>

        <div>
          <Suspense fallback={<Skeleton className=" h-10 w-full"></Skeleton>}>
            <Label>المحتوى</Label>
            <div dir="rtl">
              <RichTextEditor content={content} setContent={setContent} />
            </div>{" "}
          </Suspense>
        </div>
        <SubmitButton>حفظ</SubmitButton>
        <Separator className="w-full text-primary bg-background my-2" />
        <div className="my-2">
          <div className="flex w-full justify-end items-center gap-2">
            {" "}
            <Button
              type={"button"}
              onClick={() => setShowOutput(!showOutput)}
              size={"icon"}
              variant={"outline"}
            >
              {showOutput ? <FaEyeSlash /> : <FaRegEye />}
            </Button>
            <h2 className="text-center">output</h2>
          </div>
          <RenderHtml className={cn(!showOutput && "hidden")} html={content} />
        </div>
      </div>
    </Form>
  );
};

export { NewOfferForm };

const Feature = ({
  value,
  removeFeature,
}: {
  value: ListOffer;
  removeFeature: (val: string) => void;
}) => {
  return (
    <div
      className={`rounded-md group px-4 py-2 transition-all flex-between-row text-center gap-2 m-1 text-white bg-primary w-full`}
    >
      <Button
        className="hidden group-hover:flex"
        onClick={() => removeFeature(value.title)}
        type={"button"}
        variant={"destructive"}
        size={"icon"}
      >
        x
      </Button>
      {value.title}
    </div>
  );
};
