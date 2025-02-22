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
      dangerouslySetInnerHTML={{ __html: wrapTablesInDiv(html) }}
    />
  );
};

export default RenderHtml;

function wrapTablesInDiv(html: string): string {
  // Use a regular expression to find <table> elements and wrap them
  return html.replace(/<table([\s\S]*?)<\/table>/gi, (match) => {
    return `<div class="tableWrapper">${match}</div>`;
  });
}
