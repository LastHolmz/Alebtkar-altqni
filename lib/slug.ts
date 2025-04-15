"use server";
import prisma from "@/prisma/db";
import { nanoid } from "nanoid"; // Optionally, for generating a unique ID

async function generateSlug(title: string): Promise<string> {
  // Step 1: Create a slug from the title
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens

  // Step 2: Check if the slug already exists
  let uniqueSlug = slug;
  let article = await prisma.article.findFirst({
    where: { slug: uniqueSlug },
  });

  // Step 3: If slug exists, append a unique identifier
  if (article) {
    uniqueSlug = `${slug}-${nanoid(6)}`; // Append a random string to make it unique
  }

  return uniqueSlug;
}

export { generateSlug };
