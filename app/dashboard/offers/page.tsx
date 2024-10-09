import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CustomLink } from "@/components/ui/custom-link";
import { getOffers } from "@/db/offer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Share from "./components/share";
import uri from "@/lib/constant";
import { Pencil } from "lucide-react";
import { IoCopyOutline } from "react-icons/io5";
import CopyToClipBoard, { Copy } from "@/app/components/copy-to-clipboard";
import { DeleteOfferForm } from "./components/forms";

const page = async () => {
  const offers = await getOffers();
  return (
    <main className="container">
      <div className="my-2 flex justify-between items-center flex-wrap md:flex-row gap-2">
        <Breadcrumb dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>العروض</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink href="offers/new">جديد</CustomLink>
      </div>

      <h1 className="text-2xl font-bold tracking-wider my-2">العروض</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 xl:gap-7">
        {offers?.map((offer, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-start gap-2 items-center w-full">
                  <span>الى:</span> <span>{offer.to}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex group hover:bg-accent  px-2 py-1 rounded justify-between gap-2 items-center w-full">
                  <span>{offer.title}</span>
                  <span className="hidden p-2 transition-all duration-500 group-hover:flex">
                    <Copy value={offer.title.toString()} />
                  </span>
                </div>
                <div className="flex group hover:bg-accent  px-2 py-1 rounded justify-between gap-2 items-center w-full">
                  <span>{offer.phone}</span>
                  <span className="hidden p-2 transition-all duration-500 group-hover:flex">
                    <Copy value={offer.phone.toString()} />
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end items-center gap-2">
                <CustomLink
                  variant={"ghost"}
                  size={"icon"}
                  href={`offers/${offer.id}`}
                >
                  <Pencil size={18} />
                </CustomLink>
                <Share value={`${uri}/offers/${offer.id}`} />
                <DeleteOfferForm offer={offer} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default page;
