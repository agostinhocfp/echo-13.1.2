"use client";
import React, { useEffect } from "react";
import { RiHome2Line } from "react-icons/ri";
import { Typography } from "@mui/material";

import styles from "./error.module.css";
import SectionLayout from "../../components/layouts/SectionLayout/SectionLayout";
import MainButton from "../../components/nano/MainButton/MainButton";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <SectionLayout>
      <div className={styles.root}>
        <Typography variant="h3" className={styles.message}>
          {`We're sorry, but something went wrong.`}
        </Typography>

        <Link href="/">
          <MainButton
            className={styles.homeButton}
            buttonIcon={RiHome2Line}
            text="Home"
            onClick={() => this.setState({ hasError: false })}
          />
        </Link>
      </div>
    </SectionLayout>
  );
}
