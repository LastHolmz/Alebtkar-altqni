"use client";

import Form from "@/app/components/reusable-form";
import { $Enums, ListForOffer, Offer } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import SubmitButton from "@/app/components/custom-submit-btn";
import { Input } from "@/components/ui/input";
import { submitOfferAction } from "../actions";

export const SubmitForm = ({
  offer,
}: {
  offer: Offer & { list: ListForOffer[] };
}) => {
  const [totalPrice, setTotalPrice] = useState(offer.totalPrice);
  return (
    <Form
      className="my-4 bg-secondary border px-8 py-8 rounded-md w-full"
      action={submitOfferAction}
      dontReplace
    >
      <h2 className="w-fit mx-auto font-bold text-xl mb-4">
        اختيار الخدمات الإضافية
      </h2>

      {offer?.list?.map((li, i) => (
        <ListSelect setTotalPrice={setTotalPrice} i={i} li={li} key={i} />
      ))}

      {/* Hidden inputs for the rest of the offer data */}
      <Input type="hidden" name="id" value={offer.id} />
      <Input type="hidden" name="length" value={offer.list.length} />
      <Input type="hidden" name="content" value={offer.content} />
      <Input value={offer.to} name="to" type="hidden" />
      <Input value={offer.title} name="title" type="hidden" />
      <Input value={offer.phone} name="phone" type="hidden" />
      <Input value={totalPrice} name="totalPrice" type="hidden" />
      <Input value={offer?.email ?? ""} name="email" type="hidden" />

      <div className="w-full flex flex-col md:flex-row gap-4  justify-between items-center">
        <SubmitButton disabled={!offer.editable} className="mt-4">
          طلب
        </SubmitButton>
        <div>
          {" "}
          <span>السعر الكلي: </span>
          <b>{totalPrice} دينار</b>
        </div>
      </div>
    </Form>
  );
};

const ListSelect = ({
  li,
  setTotalPrice,
  i,
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
}) => {
  const [select, setSelect] = useState(li.selected);

  return (
    <div className="items-top justify-start items-center w-full gap-2 flex space-x-2">
      {/* Checkbox to track selection */}
      <Checkbox
        checked={select}
        onCheckedChange={() => {
          setSelect(!select);
          setTotalPrice((prev) => {
            if (li.price) {
              if (!select) {
                return (prev += li.price);
              } else {
                return (prev -= li.price);
              }
            }
            return prev;
          });
        }} // Toggle selection
        id={`list-order-${i}`}
        name={`list-order-selected-${i}`}
        value={select ? "true" : "false"}
      />

      {/* Hidden inputs to store title, period, and price */}
      <Input type="hidden" name={`list-title-${i}`} value={li.title} />
      <Input type="hidden" name={`list-period-${i}`} value={li?.period ?? 0} />
      <Input type="hidden" name={`list-price-${i}`} value={li.price ?? 0} />

      {/* Label displaying the list item */}
      <label
        htmlFor={`list-order-${i}`}
        className={cn(
          "flex items-center gap-2 justify-between w-full text-xl font-medium",
          select && "text-primary"
        )}
      >
        <span>{li.title}</span>
        <div className="text-sm">
          <span>{li.period} يوم</span>
        </div>
        <div>{li.price}دينار</div>
      </label>
    </div>
  );
};
