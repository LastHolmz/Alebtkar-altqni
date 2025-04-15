"use client";

import { Suspense, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { Label } from "./ui/label";
import { UploadDropzone, UploadButton } from "@/components/upload";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ImageProps {
  defaultImage?: nullable | string;
  name?: string;
  title?: string;
  dropClassName?: string;
}
interface PdfProps {
  defaultPdf?: string | null | undefined;
  name?: string;
  title?: string;
  dropClassName?: string;
}

const CustomDropzoneUploadImage = ({
  defaultImage = "",
  name = "image",
  title,
  dropClassName,
  responsive = false,
}: ImageProps & { responsive?: boolean }) => {
  const [image, setImage] = useState<string>(defaultImage ?? "");

  return (
    <div>
      <Input type="hidden" name={name} value={image} />
      {image ? (
        <div className="w-[200px] my-4 h-[200px] rounded-lg overflow-hidden relative">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <>
              <Button
                type={"button"}
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                variant={"outline"}
                size={"icon"}
                className="hover:text-primary/50 absolute top-0 right-0"
              >
                <MdOutlineCancel />
              </Button>
              <Image
                src={image}
                alt="some name"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </>
          </Suspense>
        </div>
      ) : (
        <div className={dropClassName}>
          {title && <Label>رفع {title}</Label>}
          {responsive && (
            <UploadButton
              className="md:hidden w-full"
              content={{
                button: `${title}`,
                allowedContent: "يجب أن لا يتجاوز حجم الصورة 128 ميجابايت",
              }}
              config={{
                appendOnPaste: true,
                mode: "auto",
              }}
              onClientUploadComplete={(res) => {
                console.log(res);
                setImage(res[0].url);
                toast({ title: "تم الرفع بنجاح" });
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
              endpoint="imageUploader"
            />
          )}
          <UploadDropzone
            endpoint="imageUploader"
            className={cn(
              "text-white  upload-border ut-button:bg-primary/50 ut-button:ut-readying:bg-primary/60 ut-button:ut-uploading:bg-primary/50",
              responsive && "phone-only:hidden"
            )}
            appearance={{
              label:
                "text-black dark:text-white custom-class hover:text-primary",
              allowedContent: "dark:text-white",
              button({ uploadProgress, isUploading }) {
                if (uploadProgress || isUploading) {
                  return "ut-button:ut-uploading:bg text-white  custom-button-uploading";
                }
                return "text-white";
              },
            }}
            content={{
              label: `${title}`,
              button({ uploadProgress, isDragActive, ready }) {
                if (!ready) return "جاري الإنتظار...";
                if (uploadProgress)
                  return (
                    <div className="absolute z-50">
                      جار الرفع {uploadProgress}
                    </div>
                  );
                return isDragActive ? "نسخ" : "رفع ملف";
              },

              allowedContent: "يجب أن لا يتجاوز حجم الصورة 128 ميجابايت",
            }}
            config={{
              appendOnPaste: true,
              mode: "auto",
            }}
            onClientUploadComplete={(res) => {
              console.log(res);
              setImage(res[0].url);
              toast({ title: "تم الرفع بنجاح" });
            }}
            onUploadError={(error: Error) => {
              toast({ title: `ERROR! ${error.message}` });
            }}
          />
        </div>
      )}
    </div>
  );
};
const CustomDropzoneUploadPdf = ({
  defaultPdf = "",
  name = "pdf",
  title,
  dropClassName,
  responsive = false,
}: PdfProps & { responsive?: boolean }) => {
  const [pdf, setPdf] = useState<string>(defaultPdf ?? "");

  return (
    <div>
      <Input type="hidden" name={name} value={pdf} />
      {pdf ? (
        <div className="w-[200px] my-4 h-[200px] rounded-lg overflow-hidden relative">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <>
              <Button
                type={"button"}
                onClick={(e) => {
                  e.preventDefault();
                  setPdf("");
                }}
                variant={"outline"}
                size={"icon"}
                className="hover:text-primary/50 absolute top-0 right-0"
              >
                <MdOutlineCancel />
              </Button>
              <Image
                src={"/images/pdf.png"}
                alt="pdf"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </>
          </Suspense>
        </div>
      ) : (
        <div className={dropClassName}>
          {title && <Label>رفع {title}</Label>}
          {responsive && (
            <UploadButton
              className="md:hidden w-full"
              content={{
                button: `${title}`,
                allowedContent: "يجب أن لا يتجاوز حجم الصورة 128 ميجابايت",
              }}
              config={{
                appendOnPaste: true,
                mode: "auto",
              }}
              onClientUploadComplete={(res) => {
                console.log(res);
                setPdf(res[0].url);
                toast({ title: "تم الرفع بنجاح" });
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
              endpoint="pdfUploader"
            />
          )}
          <UploadDropzone
            endpoint="pdfUploader"
            className={cn(
              "text-white upload-border border-foreground ut-button:bg-primary/50 ut-button:ut-readying:bg-primary/60 ut-button:ut-uploading:bg-primary/50",
              responsive && "phone-only:hidden"
            )}
            appearance={{
              label:
                "text-black dark:text-white custom-class hover:text-primary",
              allowedContent: "dark:text-white",
              button({ uploadProgress, isUploading }) {
                if (uploadProgress || isUploading) {
                  return "ut-button:ut-uploading:bg text-white  custom-button-uploading";
                }
                return "text-white";
              },
            }}
            content={{
              label: `${title}`,
              button({ uploadProgress, isDragActive, ready }) {
                if (!ready) return "جاري الإنتظار...";
                if (uploadProgress)
                  return (
                    <div className="absolute z-50">
                      جار الرفع {uploadProgress}
                    </div>
                  );
                return isDragActive ? "نسخ" : "رفع ملف";
              },

              allowedContent: "يجب أن لا يتجاوز حجم الصورة 128 ميجابايت",
            }}
            config={{
              appendOnPaste: true,
              mode: "auto",
            }}
            onClientUploadComplete={(res) => {
              console.log(res);
              setPdf(res[0].url);
              toast({ title: "تم الرفع بنجاح" });
            }}
            onUploadError={(error: Error) => {
              toast({ title: `ERROR! ${error.message}` });
            }}
          />
        </div>
      )}
    </div>
  );
};

export { CustomDropzoneUploadImage, CustomDropzoneUploadPdf };
