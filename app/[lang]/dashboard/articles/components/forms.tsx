"use client";
import { CustomDropzoneUploadImage } from "@/components/custom-dropzone";
import Form from "@/components/form";
import LanguageTabs from "@/components/langauge-tabs";
import Editor from "@/components/rich-text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  createArticleAction,
  deleteArticleAction,
  updateArticleAction,
} from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Button } from "@/components/ui/button";
import { Article } from "@prisma/client";

export const CreateNewArticleForm = () => {
  const [body, setBody] = useState<string>("");
  const [enBody, setEnBody] = useState<string>("");

  return (
    <Form
      success="تم انشاء المقالة بنجاح"
      replaceLink="/dashboard/articles"
      className="my-2 px-4 md:w-1/2 md:mx-auto"
      action={createArticleAction}
      submitClass="md:w-1/2 w-full"
      submit="انشاء"
    >
      <CustomDropzoneUploadImage
        name="poster"
        title="الملصق الإعلاني"
        dropClassName="border-forground/50"
      />

      <Separator className="bg-foreground/50 my-4" />

      <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
        <Label htmlFor="type">نوع المقالة</Label>
        <Select name="type" dir="rtl" defaultValue={"news"}>
          <SelectTrigger id="type" className="md:w-[180px] w-full">
            <SelectValue placeholder="حدد النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="news">إخبارية</SelectItem>
            <SelectItem value="research">بحثية</SelectItem>
            <SelectItem value="confrenece">مؤتمر</SelectItem>
            <SelectItem value="article">مقالة</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
        <Label htmlFor="readTime">مدة القراءة</Label>
        <Input
          className="md:w-1/2"
          type="number"
          name="readTime"
          id="readTime"
          placeholder="أدخل مدة قراءة المقالة"
        />
      </div>
      <LanguageTabs
        arabicContent={
          <div className="mx-auto">
            <Input value={body} type={"hidden"} name="body" />
            <div className="mb-4">
              <Label htmlFor="title">عنوان المقالة</Label>
              <Input
                type={"text"}
                name="title"
                id="title"
                placeholder="العنوان هنا"
              />
            </div>
            <div className="my-2">
              <Label className="mb-2">محتويات المقالة</Label>
              <Editor content={body} onChange={setBody} />
            </div>
          </div>
        }
        englishContent={
          <div>
            <Input value={enBody} type={"hidden"} name="enBody" />
            <div className="mb-4">
              <Label htmlFor="enTitle">article title</Label>
              <Input
                type={"text"}
                name="enTitle"
                id="enTitle"
                placeholder="enter title"
              />
            </div>
            <div className="my-2">
              <Label className="mb-2">article content</Label>
              <Editor content={enBody} onChange={setEnBody} />
            </div>
          </div>
        }
      />
    </Form>
  );
};

export const DeleteArticleForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button variant={"destructive"}>حذف المقالة</Button>} // Styled trigger button
      action={deleteArticleAction}
      title="حذف مقال"
      discardVariant="default"
      submitVariant="outline"
      description="من خلال هذا النموذج، يمكنك حذف المقالة بسهولة. بمجرد الإرسال، سيتم حذف المقالة بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};

export const UpdateArticleForm = ({ article }: { article: Article }) => {
  const [body, setBody] = useState<string>(article.body);
  const [enBody, setEnBody] = useState<string>(article.enBody);

  return (
    <Form
      success="تم تحديث المقالة بنجاح"
      replaceLink="/dashboard/articles"
      className="my-2 px-4 md:w-1/2 md:mx-auto"
      action={updateArticleAction}
      submitClass="md:w-1/2 w-full"
      submit="تحديث"
    >
      <Input type="hidden" value={article.id} name="id" readOnly required />
      <CustomDropzoneUploadImage
        name="poster"
        title="الملصق الإعلاني"
        dropClassName="border-foreground/50"
        defaultImage={article.poster}
      />

      <Separator className="bg-foreground/50 my-4" />

      <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
        <Label htmlFor="type">نوع المقالة</Label>
        <Select name="type" dir="rtl" defaultValue={article.type}>
          <SelectTrigger id="type" className="md:w-[180px] w-full">
            <SelectValue placeholder="حدد النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="news">إخبارية</SelectItem>
            <SelectItem value="research">بحثية</SelectItem>
            <SelectItem value="conference">مؤتمر</SelectItem>
            <SelectItem value="article">مقالة</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
        <Label htmlFor="readTime">مدة القراءة</Label>
        <Input
          className="md:w-1/2"
          type="number"
          name="readTime"
          id="readTime"
          defaultValue={article?.readTime ?? undefined}
          placeholder="أدخل مدة قراءة المقالة"
        />
      </div>

      <LanguageTabs
        arabicContent={
          <div className="mx-auto">
            <Input value={body} type={"hidden"} name="body" />
            <div className="mb-4">
              <Label htmlFor="title">عنوان المقالة</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="العنوان هنا"
                defaultValue={article.title}
              />
            </div>
            <div className="my-2">
              <Label className="mb-2">محتويات المقالة</Label>
              <Editor content={body} onChange={setBody} />
            </div>
          </div>
        }
        englishContent={
          <div>
            <Input value={enBody} type={"hidden"} name="enBody" />
            <div className="mb-4">
              <Label htmlFor="enTitle">article title</Label>
              <Input
                type="text"
                name="enTitle"
                id="enTitle"
                placeholder="enter title"
                defaultValue={article.enTitle}
              />
            </div>
            <div className="my-2">
              <Label className="mb-2">article content</Label>
              <Editor content={enBody} onChange={setEnBody} />
            </div>
          </div>
        }
      />
    </Form>
  );
};
