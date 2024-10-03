import Logo from "@/app/components/logo";
import RenderHtml from "@/app/components/render-html";
import { Separator } from "@/components/ui/separator";
import { getOfferById } from "@/db/offer";
import { notFound } from "next/navigation";
import React from "react";
import { SubmitForm } from "../components/forms";

const page = async ({ params }: { params: { offer: string } }) => {
  const { offer: id } = params;
  const offer = await getOfferById(id);

  if (!offer) {
    return notFound();
  }

  console.log(offer.list[0]);

  return (
    <main>
      <div className="py-10">
        <div className="w-40 mx-auto mb-5">
          <Logo />
        </div>
        <Separator className="my-2" />
        <div className="container">
          <RenderHtml html={offer.content} />
        </div>
        <Separator className="my-2" />
        <div className="container">
          <SubmitForm offer={offer} />
        </div>
      </div>
    </main>
  );
};

export default page;
