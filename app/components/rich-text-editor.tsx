"use client";

// import React from "react";
// import { type Editor } from "@tiptap/react";
// import {
//   Strikethrough,
//   Italic,
//   List,
//   ListOrdered,
//   Quote,
//   Undo,
//   Redo,
//   Code,
// } from "lucide-react";
// import { BsTextLeft, BsTextRight } from "react-icons/bs";

// import { FontBoldIcon } from "@radix-ui/react-icons";

// import { cn } from "@/lib/utils";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import { IoIosArrowDown } from "react-icons/io";
// import { CiTextAlignCenter } from "react-icons/ci";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// // import { FaRegImage } from "react-icons/fa";
// // import { Toggle } from "@/components/ui/Toggle";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { toast } from "@/hooks/use-toast";
// // import { UploadToggle } from "../dashboard/components/upload";

// export function Heading({ editor }: { editor: Editor | null }) {
//   if (!editor) {
//     return null;
//   }
//   return (
//     <Menubar className="border-0 border-none ring-0">
//       <MenubarMenu>
//         <MenubarTrigger className="border-0 border-none ring-0 cursor-pointer flex-between gap-2">
//           <span>{editor.isActive("heading", { level: 1 }) && "heading1"}</span>
//           <span>{editor.isActive("heading", { level: 2 }) && "heading2"}</span>
//           <span>{editor.isActive("heading", { level: 3 }) && "heading3"}</span>
//           <span>
//             {!editor.isActive("heading", { level: 3 }) &&
//               !editor.isActive("heading", { level: 2 }) &&
//               !editor.isActive("heading", { level: 1 }) &&
//               "paragraph"}
//           </span>
//           <IoIosArrowDown />
//         </MenubarTrigger>
//         <MenubarContent>
//           <MenubarItem
//             onClick={(e) => {
//               e.preventDefault();
//               editor.chain().focus().toggleHeading({ level: 1 }).run();
//             }}
//           >
//             Heading1
//           </MenubarItem>

//           <MenubarItem
//             onClick={(e) => {
//               e.preventDefault();
//               editor.chain().focus().toggleHeading({ level: 2 }).run();
//             }}
//           >
//             Heading2
//           </MenubarItem>
//           <MenubarItem
//             onClick={(e) => {
//               e.preventDefault();
//               editor.chain().focus().toggleHeading({ level: 3 }).run();
//             }}
//           >
//             Heading3
//           </MenubarItem>
//           <MenubarSeparator />

//           <MenubarItem
//             onClick={(e) => {
//               e.preventDefault();
//               editor.chain().focus().setParagraph().run();
//             }}
//           >
//             paragraph
//           </MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//     </Menubar>
//   );
// }

// type ToolbarProps = {
//   editor: Editor | null;
//   content: string;
// };

// const Toolbar = ({ editor, content }: ToolbarProps) => {
//   if (!editor) {
//     return null;
//   }
//   return (
//     <div
//       className="px-4 py-3 rounded-t-lg flex justify-between items-start
//     gap-1 w-full flex-wrap border border-secondary-foreground"
//     >
//       <div className="flex justify-start items-center gap-1 w-full lg:w-10/12 flex-wrap ">
//         <ToolbarToggle
//           ariaLabel="Toggle bold"
//           active="bold"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleBold().run();
//           }}
//         >
//           <FontBoldIcon className="h-4 w-4" />
//         </ToolbarToggle>
//         <ToolbarToggle
//           ariaLabel="Toggle italic"
//           active="italic"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleItalic().run();
//           }}
//         >
//           <Italic className="w-4 h-4" />
//         </ToolbarToggle>
//         <ToolbarToggle
//           ariaLabel="Toggle strike"
//           active="strike"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleStrike().run();
//           }}
//         >
//           <Strikethrough className="w-4 h-4" />
//         </ToolbarToggle>
//         <Heading editor={editor} />
//         <ToolbarToggle
//           ariaLabel="Toggle unordered list"
//           active="bulletList"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleBulletList().run();
//           }}
//         >
//           <List className="w-4 h-4" />{" "}
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="Toggle ordered list"
//           active="orderedList"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleOrderedList().run();
//           }}
//         >
//           <ListOrdered className="w-4 h-4" />
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="Toggle blockquote"
//           active="blockquote"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleBlockquote().run();
//           }}
//         >
//           <Quote className="w-4 h-4" />
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="Toggle code"
//           active="code"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().setCode().run();
//           }}
//         >
//           <Code className="w-4 h-4" />
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="Toggle left"
//           active={""}
//           editor={editor}
//           specialCondtion
//           activeValue={editor.isActive({ textAlign: "left" })}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().setTextAlign("left").run();
//           }}
//         >
//           <BsTextLeft className="w-4 h-4" />
//         </ToolbarToggle>
//         <ToolbarToggle
//           ariaLabel="Toggle center"
//           active="center"
//           editor={editor}
//           specialCondtion
//           activeValue={editor.isActive({ textAlign: "center" })}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().setTextAlign("center").run();
//           }}
//         >
//           <CiTextAlignCenter className="w-4 h-4" />
//         </ToolbarToggle>
//         <ToolbarToggle
//           ariaLabel="Toggle right"
//           active={""}
//           editor={editor}
//           specialCondtion
//           activeValue={editor.isActive({ textAlign: "right" })}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().setTextAlign("right").run();
//           }}
//         >
//           <BsTextRight className="w-4 h-4" />
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="undo"
//           active="undo"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().undo().run();
//           }}
//         >
//           <Undo className="w-4 h-4" />
//         </ToolbarToggle>

//         <ToolbarToggle
//           ariaLabel="redo"
//           active="redo"
//           editor={editor}
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().redo().run();
//           }}
//         >
//           <Redo className="w-4 h-4" />
//         </ToolbarToggle>
//         {/* <Dialog>
//           <DialogTrigger asChild>
//             <Toggle type={"Toggle"} variant={"ghost"} size={"icon"}>
//               <FaRegImage />
//             </Toggle>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>اضف صورة</DialogHeader>

//             <UploadToggle
//               endpoint="imageUploader"
//               onClientUploadComplete={(res) => {
//                 editor
//                   .chain()
//                   .focus()
//                   .setImage({
//                     src: res[0].url,
//                     alt: res[0].url,
//                     title: "hello",
//                   })
//                   .run();

//                 toast({ title: "uploaded successfully" });
//               }}
//               onUploadError={(error: Error) => {
//                 // Do something with the error.
//                 alert(`ERROR! ${error.message}`);
//               }}
//             />
//           </DialogContent>
//         </Dialog> */}
//       </div>
//     </div>
//   );
// };
// type ToolbarToggleProps = {
//   editor: Editor | null;
//   active: string;
//   ariaLabel?: string;
//   children: React.ReactNode;
//   onClick?: (event: React.MouseEvent<HTMLToggleElement>) => void;
//   specialCondtion?: boolean;
//   activeValue?: boolean;
// };

// /**
//  * if there is special condition we pass  as true specialCondtiono
//  * if special condition we pass activeValue as the condition
//  * @param  {props: ToolbarToggleProps}
//  */

// const ToolbarToggle = ({
//   editor,
//   active,
//   ariaLabel,
//   children,
//   onClick,
//   specialCondtion = false,
//   activeValue = false,
// }: ToolbarToggleProps) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size={"sm"}
//             className={cn(
//               (specialCondtion ? activeValue : editor.isActive(active)) &&
//                 "bg-muted text-muted-foreground outline-none ring-1"
//             )}
//             onClick={onClick}
//             aria-label={`${ariaLabel}`}
//           >
//             {children}
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>{ariaLabel}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// export default Toolbar;
import { Toggle } from "@/components/ui/toggle";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { CiTextAlignCenter } from "react-icons/ci";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { BsTextLeft, BsTextRight } from "react-icons/bs";

const Toolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="flex justify-center items-center gap-2 flex-wrap bg-background rounded-t-md mt-4 border-b py-4">
        <Toggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </Toggle>
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
      </div>
    </div>
  );
};

const extensions = [
  // Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const content = `
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
`;

export default () => {
  return (
    <EditorProvider
      slotBefore={<Toolbar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
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
