import Logo from "@/app/components/logo";
import RenderHtml from "@/app/components/render-html";
import { Separator } from "@/components/ui/separator";
import { getOfferById } from "@/db/offer";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { SubmitForm } from "../components/forms";
import Loading from "@/app/components/loading";
import dynamic from "next/dynamic";
const RenderToNumber = dynamic(() => import("../components/render-to-number"), {
  ssr: false,
});

const page = async ({ params }: { params: { offer: string } }) => {
  const { offer: id } = params;
  const offer = await getOfferById(id);

  if (!offer) {
    return notFound();
  }

  console.log(offer);

  return (
    <main>
      <Suspense
        fallback={
          <>
            <Loading open={undefined} />
          </>
        }
      >
        <RenderToNumber phone={offer.phone}>
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
        </RenderToNumber>
      </Suspense>
    </main>
  );
};

export default page;
