import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./ActiveLink.module.css";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} aria-label="To article page">
      {/* <a
        className={styles.root}
        // href={href}
        // onClick={handleClick}
        style={style}
      > */}
      {children}
      {/* </a> */}
    </Link>
  );
}

export default ActiveLink;
