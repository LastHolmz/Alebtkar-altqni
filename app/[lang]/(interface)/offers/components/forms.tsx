"use client";

import Form from "@/app/[lang]/components/reusable-form";
import { $Enums, ListForOffer, Offer } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import SubmitButton from "@/app/[lang]/components/custom-submit-btn";
import { Input } from "@/components/ui/input";
import { submitOfferAction } from "../actions";
import { useParams } from "next/navigation";

const translations = {
  ar: {
    sectionTitle: "اختيار الخدمات الإضافية",
    submit: "طلب",
    totalPrice: "السعر الكلي",
    currency: "دينار",
    days: "يوم",
  },
  en: {
    sectionTitle: "Select Additional Services",
    submit: "Submit",
    totalPrice: "Total Price",
    currency: "LYD",
    days: "days",
  },
};

export const SubmitForm = ({
  offer,
}: // locale = "ar",
{
  offer: Offer & { list: ListForOffer[] };
  // locale?: "ar" | "en";
}) => {
  const { lang: locale } = useParams();
  const t = translations[locale as Locale];
  const [totalPrice, setTotalPrice] = useState(offer.totalPrice);

  return (
    <Form
      className="my-4 bg-secondary border px-8 py-8 rounded-md w-full"
      action={submitOfferAction}
      dontReplace
    >
      <h2 className="w-fit mx-auto font-bold text-xl mb-4">{t.sectionTitle}</h2>

      {offer?.list?.map((li, i) => (
        <ListSelect setTotalPrice={setTotalPrice} i={i} li={li} key={i} t={t} />
      ))}

      {/* Hidden inputs for offer info */}
      <Input type="hidden" name="id" value={offer.id} />
      <Input type="hidden" name="length" value={offer.list.length} />
      <Input type="hidden" name="content" value={offer.content} />
      <Input value={offer.to} name="to" type="hidden" />
      <Input value={offer.title} name="title" type="hidden" />
      <Input value={offer.phone} name="phone" type="hidden" />
      <Input value={totalPrice} name="totalPrice" type="hidden" />
      <Input value={offer?.email ?? ""} name="email" type="hidden" />

      <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
        <SubmitButton disabled={!offer.editable} className="mt-4">
          {t.submit}
        </SubmitButton>
        <div>
          <span>{t.totalPrice}: </span>
          <b>
            {totalPrice} {t.currency}
          </b>
        </div>
      </div>
    </Form>
  );
};

const ListSelect = ({
  li,
  setTotalPrice,
  i,
  t,
}: {
  li: {
    id: string;
    title: string;
    type: $Enums.ListForOfferType;
    price: number | null;
    period: number | null;
    offerId: string | null;
    selected: boolean;
  };
  i: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  t: (typeof translations)["ar"];
}) => {
  const [select, setSelect] = useState(li.selected);

  return (
    <div className="items-top justify-start items-center w-full gap-2 flex space-x-2">
      <Checkbox
        checked={select}
        onCheckedChange={() => {
          setSelect(!select);
          setTotalPrice((prev) => {
            if (li.price) {
              return !select ? prev + li.price : prev - li.price;
            }
            return prev;
          });
        }}
        id={`list-order-${i}`}
        name={`list-order-selected-${i}`}
        value={select ? "true" : "false"}
      />

      <Input type="hidden" name={`list-title-${i}`} value={li.title} />
      <Input type="hidden" name={`list-period-${i}`} value={li?.period ?? 0} />
      <Input type="hidden" name={`list-price-${i}`} value={li.price ?? 0} />

      <label
        htmlFor={`list-order-${i}`}
        className={cn(
          "grid grid-cols-3 phone-only:grid-cols-1 text-center phone-only:rounded-md phone-only:px-2 phone-only:py-1 phone-only:bg-card gap-2 justify-between w-full text-xl font-medium my-4",
          select && "text-primary"
        )}
      >
        <span className="phone-only:text-sm">{li.title}</span>
        <div className="phone-only:text-sm">
          <span>
            {li.period} {t.days}
          </span>
        </div>
        <div className="phone-only:text-sm">
          {li.price} {t.currency}
        </div>
      </label>
    </div>
  );
};
