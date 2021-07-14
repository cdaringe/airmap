import { DataSourceWidget } from "../src/components/data-source/DataSourceWidget";
import React from "react";

export default function Home() {
  return (
    <form
      className="content home w-96 max-w-screen-md"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <h1 className="text-4xl">airmap!</h1>
      <DataSourceWidget onChange={() => {}} />
    </form>
  );
}
