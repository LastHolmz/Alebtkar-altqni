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
import { ProjectCard } from "../components/project-cards";
import { parseUri } from "@/lib/utils";

const page = () => {
  return (
    <main className=" bg-secondary min-h-screen py-5">
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
              <BreadcrumbPage>كل المشاريع</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 xl:gap-8">
          {projects?.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                href={`/projects/${parseUri(project.title)}`}
                src={`${project.images[0]}`}
                title={project.title}
                // big={index % 2 !== 0}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
