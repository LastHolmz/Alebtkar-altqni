import { ReactNode } from "react";

interface Props {
  ar?: string | ReactNode;
  en?: string | ReactNode;
  lang?: Locale;
}

const ServerLang = ({ ar = "", en = "", lang = "ar" }: Props) => {
  if (lang === "ar") {
    return <>{ar}</>;
  } else return <>{en}</>;
};

export default ServerLang;
