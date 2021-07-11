import styles from "../styles/Home.module.css";
import React from "react";
import { DataSourceWidget } from "../src/components/data-source/DataSourceWidget";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>airmap!</h1>
        <DataSourceWidget onChange={() => {}} />
      </div>
      <footer className={styles.footer}>
        <a
          href="http://portlandcleanair.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By your friends at portlandcleanair.org
        </a>
      </footer>
    </div>
  );
}
