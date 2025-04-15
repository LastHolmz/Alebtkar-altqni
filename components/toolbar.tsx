"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import { BsTextLeft, BsTextRight } from "react-icons/bs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IoIosArrowDown } from "react-icons/io";
import { CiTextAlignCenter } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegImage } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "./upload";
import { toast } from "@/hooks/use-toast";

export function Heading({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  return (
    <Menubar className="border-0 border-none ring-0">
      <MenubarMenu>
        <MenubarTrigger className="border-0 border-none ring-0 cursor-pointer flex-between gap-2">
          <span>{editor.isActive("heading", { level: 1 }) && "heading1"}</span>
          <span>{editor.isActive("heading", { level: 2 }) && "heading2"}</span>
          <span>{editor.isActive("heading", { level: 3 }) && "heading3"}</span>
          <span>
            {!editor.isActive("heading", { level: 3 }) &&
              !editor.isActive("heading", { level: 2 }) &&
              !editor.isActive("heading", { level: 1 }) &&
              "paragraph"}
          </span>
          <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
          >
            Heading1
          </MenubarItem>

          <MenubarItem
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
          >
            Heading2
          </MenubarItem>
          <MenubarItem
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
          >
            Heading3
          </MenubarItem>
          <MenubarSeparator />

          <MenubarItem
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setParagraph().run();
            }}
          >
            paragraph
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

type ToolbarProps = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: ToolbarProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      dir="rtl"
      className="px-4 py-3 rounded-t-lg flex justify-between items-start
    gap-1 w-full flex-wrap border border-foreground/50"
    >
      <div className="flex justify-start items-center gap-1 w-full lg:w-10/12 flex-wrap ">
        <ToolbarButton
          ariaLabel="Toggle bold"
          active="bold"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
        >
          <FontBoldIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="Toggle italic"
          active="italic"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="Toggle strike"
          active="strike"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <Heading editor={editor} />
        <ToolbarButton
          ariaLabel="Toggle unordered list"
          active="bulletList"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List className="w-4 h-4" />{" "}
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="Toggle ordered list"
          active="orderedList"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="Toggle blockquote"
          active="blockquote"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="Toggle code"
          active="code"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="Toggle left"
          active={""}
          editor={editor}
          specialCondtion
          activeValue={editor.isActive({ textAlign: "left" })}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left").run();
          }}
        >
          <BsTextLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="Toggle center"
          active="center"
          editor={editor}
          specialCondtion
          activeValue={editor.isActive({ textAlign: "center" })}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
        >
          <CiTextAlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="Toggle right"
          active={""}
          editor={editor}
          specialCondtion
          activeValue={editor.isActive({ textAlign: "right" })}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("right").run();
          }}
        >
          <BsTextRight className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="undo"
          active="undo"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          ariaLabel="redo"
          active="redo"
          editor={editor}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
        <Dialog>
          <DialogTrigger asChild>
            <Button type={"button"} variant={"ghost"} size={"icon"}>
              <FaRegImage />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className="hidden">
              <VisuallyHidden>Loading</VisuallyHidden>
            </DialogTitle>
            <DialogHeader>اضف صورة</DialogHeader>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: res[0].url,
                    alt: res[0].url,
                    title: res[0].name,
                  })
                  .run();

                toast({ title: "تم الرفع بنجاح" });
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
type ToolbarButtonProps = {
  editor: Editor | null;
  active: string;
  ariaLabel?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  specialCondtion?: boolean;
  activeValue?: boolean;
};

/**
 * if there is special condition we pass  as true specialCondtiono
 * if special condition we pass activeValue as the condition
 * @param  {props: ToolbarButtonProps}
 */

const ToolbarButton = ({
  editor,
  active,
  ariaLabel,
  children,
  onClick,
  specialCondtion = false,
  activeValue = false,
}: ToolbarButtonProps) => {
  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size={"sm"}
            className={cn(
              (specialCondtion ? activeValue : editor.isActive(active)) &&
                "bg-muted text-muted-foreground outline-none ring-1"
            )}
            onClick={onClick}
            aria-label={`${ariaLabel}`}
          >
            {children}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{ariaLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Toolbar;
