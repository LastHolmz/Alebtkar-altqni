import RenderHtml from "@/app/components/render-html";
import { getOfferById } from "@/db/offer";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { offer: string } }) => {
  const { offer: id } = params;
  const offer = await getOfferById(id);
  if (!offer) {
    return notFound();
  }
  return (
    <main>
      <RenderHtml html={offer.content} />
    </main>
  );
};

export default page;
