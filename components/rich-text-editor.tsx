"use client";
import ImageStyle from "@tiptap/extension-image";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import React from "react";
import Image from "@tiptap/extension-image";
import Toolbar from "./toolbar";
import { cn } from "@/lib/utils";

const MenuBar = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return <Toolbar content={content} editor={editor} />;
};

const extensions = [
  Document,
  Image,
  Paragraph,
  Text,
  Heading,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "right",
  }),
  ImageStyle.configure({
    HTMLAttributes: {
      loading: "lazy",
      alt: "new image",
    },
  }),

  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Editor = ({
  content,
  onChange,
  className,
}: {
  content: string;
  onChange: any;
  className?: string;
}) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  return (
    <div className={cn(className)}>
      <EditorProvider
        editorProps={{
          attributes: {
            class:
              "flex flex-col min-h-[40vh] px-4 py-3 justify-start border-b border-r border-l border-forground/50 text-forground items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
          },
        }}
        onUpdate={(e) => {
          handleChange(e.editor.getHTML());
        }}
        slotBefore={<MenuBar content={content} />}
        extensions={extensions}
        content={content}
        immediatelyRender={false}
      >
        {""}
      </EditorProvider>
    </div>
  );
};

export default Editor;
