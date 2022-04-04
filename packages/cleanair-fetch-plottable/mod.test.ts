import { fetchObservations } from "./mod.ts";
import { assert } from "std/testing/asserts.ts";

Deno.test({
  name: "fetch observations",
  async fn() {
    const observations = await fetchObservations();
    assert(observations.length > 0);
  },
});
