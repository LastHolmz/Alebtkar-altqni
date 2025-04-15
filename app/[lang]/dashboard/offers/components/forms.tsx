"use client";
import Form from "@/app/[lang]/components/reusable-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Suspense, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import RenderHtml from "@/app/[lang]/components/render-html";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ListForOffer, Offer } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubmitButton from "@/app/[lang]/components/custom-submit-btn";
import {
  deleteOfferAction,
  newOfferAction,
  updateOfferAction,
} from "../actions";
import AccessibleDialogForm from "@/app/[lang]/components/accible-dialog-form";
import { Plus, Trash, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const RichTextEditor = dynamic(
  () => import("@/app/[lang]/components/rich-text-editor"),
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
  const [showOutput, setShowOutput] = useState(false);
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
      <div className="grid md:grid-cols-2 gap-5">
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
          <Label htmlFor="totalPrice">السعر</Label>
          <Input name="totalPrice" id="totalPrice" required type="text" />
        </div>
        <div>
          <Label htmlFor="email">email</Label>
          <Input name="email" id="email" required type="email" />
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="langauge">اللغة</Label>
          <Select name="langauge" dir="rtl" defaultValue={"ar"}>
            <SelectTrigger id="langauge" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* features */}

      <div>
        <div className="flex justify-between items-center md:w-1/2 my-2">
          <Label htmlFor="features">مميزات العرض</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button type={"button"} size={"sm"}>
                <Plus size={"18"} />
              </Button>
            </DialogTrigger>
            <DialogContent className="py-8">
              <div>
                <Label>
                  العنوان
                  <Input
                    className="my-2"
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
                </Label>
              </div>
              <Label>
                السعر
                <Input
                  className="my-2"
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
              </Label>
              <Label>
                المدة
                <Input
                  className="my-2"
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
              </Label>

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
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex min-h-20 my-3 justify-start bg-background border rounded-lg px-4 py-2 items-center flex-wrap md:w-1/2">
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
    </Form>
  );
};

const DeleteOfferForm = ({ offer }: { offer: Offer }) => {
  return (
    <AccessibleDialogForm
      trigger={
        <Button variant={"ghost"} size={"icon"}>
          <Trash2Icon size={18} />
        </Button>
      }
      dontReplace
      title={`هل أنت متأكد من حذف ${offer.title}`}
      action={deleteOfferAction}
    >
      <Input type={"hidden"} name="id" value={offer.id} />

      <SubmitButton>حذف</SubmitButton>
    </AccessibleDialogForm>
  );
};

const Feature = ({
  value,
  removeFeature,
}: {
  value: ListOffer;
  removeFeature: (val: string) => void;
}) => {
  return (
    <div
      className={`rounded-md group px-4 py-2 duration-500 transition-all flex justify-between items-center text-center gap-2 m-1 text-white bg-secondary w-full`}
    >
      {value.title}
      <Button
        className="hidden group-hover:flex"
        onClick={() => removeFeature(value.title)}
        type={"button"}
        variant={"destructive"}
        size={"icon"}
      >
        <Trash />
      </Button>
    </div>
  );
};

const EditOfferForm = ({
  offer,
}: {
  offer: Offer & { list: ListForOffer[] };
}) => {
  const [content, setContent] = useState<string>(offer.content);
  const [showOutput, setShowOutput] = useState(true);
  const [features, setFeatures] = useState<ListOffer[]>(
    offer.list.map((li) => ({
      period: li.period,
      price: li.price,
      selected: li.selected,
      title: li.title,
      type: li.type,
    }))
  );
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
    <Form action={updateOfferAction} replaceLink="/dashboard/offers">
      <Input type={"hidden"} name="content" value={content} />
      <Input type={"hidden"} name="list" value={JSON.stringify(features)} />
      <Input type={"hidden"} name="id" value={offer.id} />
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="to">الى</Label>
          <Input
            name="to"
            id="to"
            defaultValue={offer.to}
            required
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="title">العنوان</Label>
          <Input
            name="title"
            id="title"
            defaultValue={offer.title}
            required
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            defaultValue={offer.phone}
            name="phone"
            id="phone"
            required
            type="tel"
          />
        </div>
        <div>
          <Label htmlFor="totalPrice">السعر</Label>
          <Input
            defaultValue={offer.totalPrice}
            name="totalPrice"
            id="totalPrice"
            required
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="email">email</Label>
          <Input
            defaultValue={offer?.email ?? ""}
            name="email"
            id="email"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="langauge">اللغة</Label>
          <Select
            name="langauge"
            dir="rtl"
            defaultValue={offer?.langauge ?? "ar"}
          >
            <SelectTrigger id="langauge" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* features */}
      </div>
      <div>
        <div className="flex justify-between items-center md:w-1/2 my-2">
          <Label htmlFor="features">مميزات العرض</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button type={"button"} size={"sm"}>
                <Plus size={"18"} />
              </Button>
            </DialogTrigger>
            <DialogContent className="py-8">
              <div>
                <Label>
                  العنوان
                  <Input
                    className="my-2"
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
                </Label>
              </div>
              <Label>
                السعر
                <Input
                  className="my-2"
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
              </Label>
              <Label>
                المدة
                <Input
                  className="my-2"
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
              </Label>

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
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex min-h-20 my-3 justify-start bg-background border rounded-lg px-4 py-2 items-center flex-wrap md:w-1/2">
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
    </Form>
  );
};

export { NewOfferForm, DeleteOfferForm, EditOfferForm };
