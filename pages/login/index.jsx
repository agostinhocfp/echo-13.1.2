import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./Login.module.css";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Olá, {session.user.email}</button>
      </>
    );
  }
  return (
    <div className={styles.root}>
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    </div>
  );
}
