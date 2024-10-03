import { cn } from "@/lib/utils";

interface Props {
  html: string;
  className?: string;
}

const RenderHtml = ({ html, className }: Props) => {
  return (
    <div
      // dir={dir}
      className={cn("ProseMirror tiptap rounded-lg max-w-full ", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RenderHtml;
