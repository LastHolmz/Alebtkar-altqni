import Logo from "@/app/components/logo";
import RenderHtml from "@/app/components/render-html";
import { Separator } from "@/components/ui/separator";
import { getOfferById } from "@/db/offer";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { SubmitForm } from "../components/forms";
import Loading from "@/app/components/loading";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const RenderToNumber = dynamic(() => import("../components/render-to-number"), {
  ssr: false,
});

export const generateMetadata = async ({
  params,
}: {
  params: { offer: string };
}): Promise<Metadata> => {
  const { offer: id } = params;
  const offer = await getOfferById(id);

  return {
    title: offer?.title,
  };
};

const page = async ({ params }: { params: { offer: string } }) => {
  const { offer: id } = params;
  const offer = await getOfferById(id);

  if (!offer) {
    return notFound();
  }

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
            <h1 className="mx-auto mb-5 w-fit md:text-3xl text-xl font-bold">
              {/* <Logo /> */}
              {offer.title}
            </h1>
            <Separator className="my-2 mb-5 w-[80%] mx-auto bg-primary" />
            <div className="container">
              <RenderHtml html={offer.content} />
            </div>
            {/* <Separator className="my-2" /> */}
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
