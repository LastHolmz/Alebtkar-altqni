import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { projects } from "@/data";
import { ProjectCard } from "../../components/project-cards";
import { parseUri } from "@/lib/utils";

const page = () => {
  return (
    <main className="min-h-screen py-5">
      <div className="container">
        <Breadcrumb dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>بعض المشاريع</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold tracking-wider my-2">بعض المشاريع</h1>
        <p>بعض المشاريع التي قمنا بالعمل</p>

        <blockquote className="p-4 my-4 border-s-4 border-primary bg-accent ">
          <p className="italic font-medium leading-relaxed">
            قد تكون بعض المشاريع متعطلة عن العمل نظرا لعدم تسديد كل الدفعات او
            عدم اكتمال المشروع{" "}
          </p>
        </blockquote>

        <div className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 xl:gap-8">
          {projects?.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                href={project.href}
                src={`${project.images[0]}`}
                title={project.title}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
