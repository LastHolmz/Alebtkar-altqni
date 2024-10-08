import { IconType } from "react-icons";
import { BsFiletypeHtml } from "react-icons/bs";
import { GiTrade } from "react-icons/gi";
import { LiaConnectdevelop } from "react-icons/lia";
import { FaFingerprint } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { TbApi, TbDeviceMobileCode } from "react-icons/tb";
// import { FaDatabase, FaFingerprint } from "react-icons/fa";
// import { BiSupport } from "react-icons/bi";
// import { IoIosCloudUpload } from "react-icons/io";
// import { SiAzuredevops, SiTestin } from "react-icons/si";

export const services: {
  title: string;
  icon: IconType;
  description: string;
}[] = [
  {
    title: "تطوير البرمجيات المخصصة",
    description: "تطوير تطبيقات مصممة خصيصًا لتلبية احتياجات الأعمال المحددة.",
    icon: LiaConnectdevelop,
  },
  {
    title: "تطوير الويب",
    description: "إنشاء وصيانة المواقع أو تطبيقات الويب.",
    icon: BsFiletypeHtml,
  },
  {
    title: "تطوير تطبيقات الهواتف المحمولة",
    description: "بناء تطبيقات للمنصات المحمولة مثل أندرويد وiOS.",
    icon: TbDeviceMobileCode,
  },
  {
    title: "تصميم واجهة المستخدم وتجربة المستخدم (UI/UX)",
    description:
      "تصميم واجهات المستخدم وتجارب المستخدم لتحسين التفاعل وقابلية الاستخدام.",
    icon: MdDesignServices,
  },
  // {
  //   title: "حلول الحوسبة السحابية",
  //   description:
  //     "تقديم بنية تحتية سحابية، تخزين، واستضافة التطبيقات (مثل AWS، جوجل كلاود، أزور).",
  //   icon: IoIosCloudUpload,
  // },
  // {
  //   title: "خدمات DevOps",
  //   description:
  //     "تنفيذ التكامل المستمر والنشر، وأتمتة البنية التحتية، والمراقبة لضمان كفاءة تسليم البرمجيات.",
  //   icon: SiAzuredevops,
  // },
  {
    title: "تطوير ودمج واجهات برمجة التطبيقات (API)",
    description: "تصميم ودمج واجهات البرمجة لتسهيل التفاعل بين التطبيقات.",
    icon: TbApi,
  },
  // {
  //   title: "استشارات تقنية المعلومات",
  //   description:
  //     "تقديم مشورة متخصصة حول استراتيجيات التكنولوجيا، وأدوات البرمجيات، وهياكلها.",
  //   icon: BiSupport,
  // },
  // {
  //   title: "خدمة اختبار الأنظمة البرمجية",
  //   description:
  //     "خدمة اختبار الأنظمة البرمجية تتضمن التحقق من جودة وأداء البرامج من خلال اكتشاف الأخطاء والمشاكل المحتملة.",
  //   icon: SiTestin,
  // },
  {
    title: "تطوير مواقع التجارة الإلكترونية",
    description:
      "بناء المتاجر الإلكترونية، وواجهات الدفع، والتعامل مع التكاملات لمنصات التسوق.",
    icon: GiTrade, // Use the appropriate icon for e-commerce if available
  },
  //   {
  //     title: "الذكاء الاصطناعي والتعلم الآلي",
  //     description: "تنفيذ نماذج الذكاء الاصطناعي، وحلول الأتمتة، وأنظمة معالجة البيانات.",
  //     icon: MdDesignServices, // Use the appropriate icon for AI if available
  //   },
  {
    title: "برمجة (IoT)",
    description: "بناء أنظمة مترابطة للأجهزة الذكية وأجهزة الاستشعار.",
    icon: FaFingerprint, // Use the appropriate icon for IoT if available
  },
  // {
  //   title: "إدارة قواعد البيانات",
  //   description:
  //     "تصميم وصيانة أنظمة قواعد البيانات، وضمان سلامة البيانات والأداء.",
  //   icon: FaDatabase, // Use the appropriate icon for database management if available
  // },
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
