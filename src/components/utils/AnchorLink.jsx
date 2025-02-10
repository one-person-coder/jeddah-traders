"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AnchorLink = ({
  href = "/",
  prefetch = false,
  children,
  classes = "",
  style = {},
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  console.log(isActive, pathname);

  const handleHover = (href) => {
    router.prefetch(href);
  };

  return (
    <div>
      <Link
        href={href}
        onMouseEnter={() => handleHover(href)}
        prefetch={prefetch}
        className={
          classes +
          `${
            isActive
              ? "!text-white !bg-[#8C57FF]"
              : "bg-transparent text-zinc-700"
          }`
        }
        style={style}
      >
        {children}
      </Link>
    </div>
  );
};

AnchorLink.defaultProps = {
  prefetch: false,
  className: "",
};

export default AnchorLink;
