import RenderHtml from "@/app/[lang]/components/render-html";
import { Separator } from "@/components/ui/separator";
import { getOfferById } from "@/db/offer";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { SubmitForm } from "../components/forms";
import Loading from "@/app/[lang]/components/loading";
import { Metadata } from "next";
import RenderToNumber from "../components/render-to-number";

export const generateMetadata = async (props: {
  params: Promise<{ offer: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const { offer: id } = params;
  const offer = await getOfferById(id);

  return {
    openGraph: {
      type: "website",
      url: `https://www.ebtkar.tech/offers/${offer?.id}`,
      title: `${offer?.title ?? "عرض"}`,
      description: offer?.title,
      images: [
        {
          url: "https://www.ebtkar.tech//cover.jpg",
          width: 1200,
          height: 630,
          alt: "شركة الإبتكار التقني logo",
        },
      ],
      siteName: "شركة الإبتكار التقني",
    },
  };
};

const page = async (props: { params: Promise<{ offer: string }> }) => {
  const params = await props.params;
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
