import { LoginForm } from "../components/forms";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LangRenderer from "@/components/lang";

const page = async (props: {
  searchParams?: Promise<{ redirect?: string }>;
  params: Promise<{ lang: string }>;
}) => {
  const searchParams = await props.searchParams;
  const lang = (await props.params).lang;
  const user = await getSession();
  const redirectLink = searchParams?.redirect;
  console.log(user);
  // const
  if (user) {
    redirect(redirectLink ?? `/${lang}`);
  }
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="مرحبًا بك من جديد! سجل الدخول للمتابعة"
          en="Welcome back! Sign in to continue"
        />
      </h1>
      <br />
      <LoginForm href={redirectLink} />
    </div>
  );
};

export default page;
