import Logo from "@/app/components/logo";
import RenderHtml from "@/app/components/render-html";
import { Separator } from "@/components/ui/separator";
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
      <div className="container py-10">
        <div className="w-40 mx-auto mb-5">
          <Logo />
        </div>
        <Separator className="my-2" />
        <RenderHtml html={offer.content} />
      </div>
    </main>
  );
};

export default page;
