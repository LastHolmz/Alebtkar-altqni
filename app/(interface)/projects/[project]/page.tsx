import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { parseUri, revreseParsedUri } from "@/lib/utils";
import { notFound } from "next/navigation";
import { projects } from "@/data";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { project: string };
};

const page = ({ params }: Props) => {
  const title = revreseParsedUri(params.project);
  let project: undefined | Project = undefined;
  for (let index = 0; index < projects.length; index++) {
    const currentProject = projects[index];
    if (currentProject.href != undefined && currentProject.href === title) {
      project = currentProject;
      break;
    }
    if (currentProject.title === title) {
      project = currentProject;
      break;
    }
  }

  if (!project) {
    return notFound();
  }
  return (
    <main className="min-h-screen py-5">
      <div className="container">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/projects`}>بعض المشاريع</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {project.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            {" "}
            <div className="max-w-full max-h-max rounded-xl overflow-hidden">
              <Image
                src={project.images[0]}
                alt={`${project.title} main image`}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-wider my-2 capitalize text-center">
              مشروع {project.title}
            </h1>
            <p>{project?.details}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {project.images?.map((image, index) => (
              <div className="overflow-hidden w-full h-fit" key={index}>
                <Image
                  src={image}
                  alt={`${project.title} image-${index}`}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = revreseParsedUri(params.project);
  let project: undefined | Project = undefined;
  for (let index = 0; index < projects.length; index++) {
    const currentProject = projects[index];
    if (currentProject.href != undefined && currentProject.href === title) {
      project = currentProject;
      break;
    }
    if (currentProject.title === title) {
      project = currentProject;
      break;
    }
  }
  if (!project) {
    return {
      title: "هذا المشروع لم يعد متاح",
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `مشروع ${project.title}`,
    openGraph: {
      images: [project.images[0], ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((data) => ({
    project: data.href ? data.href : parseUri(data.title),
  }));
}

export default page;
