import UsersTable from "@/components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getUsers } from "@/database/users";
import { usersTable } from "./components/users-column";
import { CreateUserForm } from "./components/forms";
const page = async (props: {
  searchParams: Promise<{ fullName?: string }>;
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;

  const { lang } = params;
  const searchParams = await props.searchParams;
  const users = await getUsers({ fullName: searchParams?.fullName });

  return (
    <main className="phone-only:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
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
              <BreadcrumbPage>ادارة المستخدمين</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateUserForm />
        {/* <CustomLink href={`/${lang}/dashboard/users/new`}>حساب جديد</CustomLink> */}
      </div>
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <UsersTable
            searchPlaceholder="البحث بالاسم"
            data={users}
            columns={usersTable}
            searchQuery="fullName"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
