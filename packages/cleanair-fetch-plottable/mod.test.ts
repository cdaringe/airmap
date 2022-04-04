import { fetchObservations } from "./mod.ts";
import { assert, assertEquals } from "std/testing/asserts.ts";

Deno.test({
  name: "fetch observations",
  async fn() {
    const observations = await fetchObservations();
    assert(observations.length > 0);
    const obs0 = observations[0];
    assertEquals(obs0, {
      device: "flow",
      urls: [
        "https://docs.google.com/spreadsheets/d/1x59PQjrKqN3NSORDaTAs557v0mloOosNTnqKhfrE3VU/edit#gid=585713925",
        "https://docs.google.com/spreadsheets/d/15QJWTrn2RVG8C2q0SF7qjXDIMabg-OXDTYkjBRLWHrw/edit#gid=2147112514",
      ],
      date: new Date("2021-10-10T07:00:00.000Z"),
      description: "some great measurment\r",
    });
  },
});
