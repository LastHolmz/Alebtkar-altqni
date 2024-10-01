"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const CookieConsent: React.FC = () => {
  // Use localStorage to store the user's cookie consent state
  const [cookiesAccepted, setCookiesAccepted] = useLocalStorage(
    "cookiesAccepted", // Key to store in localStorage
    "false" // Default value
  );

  const [showBanner, setShowBanner] = useState(false);

  // Check localStorage value when the component mounts
  useEffect(() => {
    if (cookiesAccepted === "false") {
      setShowBanner(true); // Show the banner if cookies have not been accepted
    } else {
      setShowBanner(false); // Hide the banner if cookies have already been accepted
    }
  }, [cookiesAccepted]);

  const handleAcceptCookies = () => {
    // Set a cookie and update localStorage when the user accepts cookies
    document.cookie =
      "cookiesAccepted=true; path=/; max-age=" +
      60 * 60 * 24 * 365 +
      "; SameSite=None; Secure";

    setCookiesAccepted("true"); // Store acceptance in localStorage
    setShowBanner(false); // Hide the banner
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 w-full max-w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-2 items-center">
        <p className="text-center md:text-right mb-2 md:mb-0 text-sm">
          نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستخدام موقعنا، فإنك
          توافق على استخدام ملفات تعريف الارتباط.
          <Link href="/cookie-policy" className="underline mx-1">
            اقرأ المزيد
          </Link>
        </p>
        <Button onClick={handleAcceptCookies}>موافق، أقبل</Button>
      </div>
    </div>
  );
};

export default CookieConsent;
