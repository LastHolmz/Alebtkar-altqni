import { IconType } from "react-icons";
import { BsFiletypeHtml } from "react-icons/bs";
import { GiTrade } from "react-icons/gi";
import { LiaConnectdevelop } from "react-icons/lia";
import { FaFingerprint } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { TbApi, TbDeviceMobileCode } from "react-icons/tb";

export const services: {
  title: { en: string; ar: string };
  icon: IconType;
  description: { en: string; ar: string };
}[] = [
  {
    title: {
      en: "Custom Software Development",
      ar: "تطوير البرمجيات المخصصة",
    },
    description: {
      en: "Developing custom applications tailored to specific business needs.",
      ar: "تطوير تطبيقات مصممة خصيصًا لتلبية احتياجات الأعمال المحددة.",
    },
    icon: LiaConnectdevelop,
  },
  {
    title: {
      en: "Web Development",
      ar: "تطوير الويب",
    },
    description: {
      en: "Building and maintaining websites or web applications.",
      ar: "إنشاء وصيانة المواقع أو تطبيقات الويب.",
    },
    icon: BsFiletypeHtml,
  },
  {
    title: {
      en: "Mobile App Development",
      ar: "تطوير تطبيقات الهواتف المحمولة",
    },
    description: {
      en: "Creating apps for mobile platforms such as Android and iOS.",
      ar: "بناء تطبيقات للمنصات المحمولة مثل أندرويد وiOS.",
    },
    icon: TbDeviceMobileCode,
  },
  {
    title: {
      en: "UI/UX Design",
      ar: "تصميم واجهة المستخدم وتجربة المستخدم (UI/UX)",
    },
    description: {
      en: "Designing user interfaces and experiences to enhance interaction and usability.",
      ar: "تصميم واجهات المستخدم وتجارب المستخدم لتحسين التفاعل وقابلية الاستخدام.",
    },
    icon: MdDesignServices,
  },
  {
    title: {
      en: "API Development & Integration",
      ar: "تطوير ودمج واجهات برمجة التطبيقات (API)",
    },
    description: {
      en: "Designing and integrating APIs to facilitate interaction between applications.",
      ar: "تصميم ودمج واجهات البرمجة لتسهيل التفاعل بين التطبيقات.",
    },
    icon: TbApi,
  },
  {
    title: {
      en: "E-Commerce Website Development",
      ar: "تطوير مواقع التجارة الإلكترونية",
    },
    description: {
      en: "Building e-commerce platforms, payment interfaces, and shopping integrations.",
      ar: "بناء المتاجر الإلكترونية، وواجهات الدفع، والتعامل مع التكاملات لمنصات التسوق.",
    },
    icon: GiTrade,
  },
  {
    title: {
      en: "IoT Programming",
      ar: "برمجة (IoT)",
    },
    description: {
      en: "Developing connected systems for smart devices and sensors.",
      ar: "بناء أنظمة مترابطة للأجهزة الذكية وأجهزة الاستشعار.",
    },
    icon: FaFingerprint,
  },
];

export const projects: Project[] = [
  {
    title: "our gym",
    images: [
      "/projects/our-gym/1.png",
      "/projects/our-gym/2.png",
      "/projects/our-gym/3.png",
      "/projects/our-gym/4.png",
      "/projects/our-gym/5.png",
      "/projects/our-gym/6.png",
    ],
    details:
      "صالة رياضية حديثة تهدف إلى تلبية احتياجات عشاق اللياقة البدنية من جميع المستويات. مجهزة بمرافق متطورة، وجلسات تدريب شخصية، وفصول جماعية، تروج صالتنا الرياضية لنمط حياة صحي في بيئة تحفيزية.",
  },
  {
    title: "جامعة الزينونة",
    href: "zaitona",
    images: [
      "/projects/alzitona/1.png",
      "/projects/our-gym/2.png",
      "/projects/our-gym/3.png",
      "/projects/our-gym/4.png",
      "/projects/our-gym/5.png",
    ],
    details:
      "جامعة الزينونة هي مؤسسة تعليمية بارزة تركز على تقديم تعليم عالي الجودة. مع مجموعة متنوعة من البرامج وأعضاء هيئة التدريس ذوي الخبرة، تهدف الجامعة إلى تمكين الطلاب لتحقيق النجاح في مسيرتهم الأكاديمية والمهنية.",
  },
  {
    title: "الإتحاد الوطني",
    images: [
      "/projects/alethad/2.png",
      "/projects/alethad/1.png",
      "/projects/our-gym/3.png",
      "/projects/our-gym/4.png",
      "/projects/our-gym/5.png",
    ],
    details:
      "الإتحاد الوطني هو منظمة مكرسة لتعزيز الوحدة الوطنية والتنمية الاجتماعية. من خلال مبادرات وبرامج مجتمعية متنوعة، يسعى الإتحاد لتعزيز التعاون بين المواطنين وتحسين جودة الحياة في المنطقة.",
    href: "alethad",
  },
];

export const demos: Demo[] = [
  {
    href: "/",
    image:
      "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "show case company",
    price: 899,
    bio: "اعرض شركتك على الانترنت",
  },
];
