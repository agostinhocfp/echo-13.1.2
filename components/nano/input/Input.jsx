import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./Input2.module.css";

const Input = ({ placeholder }) => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <form action="" className={styles.searchBar} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.textInput}
        />
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
    </>
  );
};

export default Input;
