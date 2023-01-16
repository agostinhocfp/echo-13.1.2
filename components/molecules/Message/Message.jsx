import React from "react";
import { Alert, AlertTitle } from "@mui/material";

import styles from "./Message.module.css";
import FlexBoxCentered from "../FlexBoxCentered/FlexBoxCentered";

const Message = ({ severity, alertTitle, children }) => {
  return (
    <FlexBoxCentered>
      <Alert className={`${styles.root} ${styles.status}`} severity={severity}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {children}
      </Alert>
    </FlexBoxCentered>
  );
};

Message.defaultProps = {
  severity: "info",
};
export default Message;
