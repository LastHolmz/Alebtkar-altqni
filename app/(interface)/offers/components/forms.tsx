"use client";

import Form from "@/app/components/reusable-form";
import { ListForOffer, Offer } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SubmitButton from "@/app/components/custom-submit-btn";
import { Input } from "@/components/ui/input";
import { submitOfferAction } from "../actions";

export const SubmitForm = ({
  offer,
}: {
  offer: Offer & { list: ListForOffer[] };
}) => {
  return (
    <Form
      className="my-4 border px-8 py-8 rounded-md"
      action={submitOfferAction}
      dontReplace
    >
      <h2 className="w-fit mx-auto font-bold text-xl mb-4">
        اختيار الخدمات الإضافية
      </h2>

      {offer?.list?.map((li, i) => {
        const [select, setSelect] = useState(li.selected);
        return (
          <div
            className="items-top justify-start items-center w-full gap-2 flex space-x-2"
            key={i}
          >
            {/* Checkbox to track selection */}
            <Checkbox
              checked={select}
              onCheckedChange={() => setSelect(!select)} // Toggle selection
              id={`list-order-${i}`}
              name={`list-order-selected-${i}`}
              value={select ? "true" : "false"}
            />

            {/* Hidden inputs to store title, period, and price */}
            <Input type="hidden" name={`list-title-${i}`} value={li.title} />
            <Input
              type="hidden"
              name={`list-period-${i}`}
              value={li?.period ?? 0}
            />
            <Input
              type="hidden"
              name={`list-price-${i}`}
              value={li.price ?? 0}
            />

            {/* Label displaying the list item */}
            <label
              htmlFor={`list-order-${i}`}
              className={cn(
                "flex items-center gap-2 justify-between w-full text-xl font-medium",
                select && "text-primary"
              )}
            >
              <span>{li.title}</span>
              <div className="flex text-sm gap-2">
                <span>{li.period} يوم</span>
                <span>|</span>
                <span>{li.price} دينار</span>
              </div>
            </label>
          </div>
        );
      })}

      {/* Hidden inputs for the rest of the offer data */}
      <Input type="hidden" name="id" value={offer.id} />
      <Input type="hidden" name="length" value={offer.list.length} />
      <Input type="hidden" name="content" value={offer.content} />
      <Input value={offer.to} name="to" type="hidden" />
      <Input value={offer.title} name="title" type="hidden" />
      <Input value={offer.phone} name="phone" type="hidden" />
      <Input value={offer?.email ?? ""} name="email" type="hidden" />

      <SubmitButton disabled={!offer.editable} className="mt-4">
        طلب
      </SubmitButton>
    </Form>
  );
};
