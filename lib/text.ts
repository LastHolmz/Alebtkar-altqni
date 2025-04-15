import { DomUtils, parseDocument } from "htmlparser2";

// Function to extract text from HTML string and truncate it
const extractText = (html: string, maxLength: number): string => {
  const dom = parseDocument(html); // Parse the HTML into a DOM-like structure
  const text = DomUtils.textContent(dom); // Extract text content
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export { extractText };
