import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AnchorLink = ({
  href = "/",
  prefetch = false,
  children,
  classes = "",
  style = {},
}) => {
  const router = useRouter();

  const handleHover = (href) => {
    console.log("fetching", href);

    router.prefetch(href);
  };

  return (
    <div>
      <Link
        href={href}
        onMouseEnter={() => handleHover(href)}
        prefetch={prefetch}
        className={classes}
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
