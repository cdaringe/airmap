/* deno has web apis, but jsdom, happy-dom, and browser env _dont_ */
import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { parse } from "../parse-pocketlabs-stream.ts";
import * as path from "https://deno.land/std@0.130.0/path/mod.ts";
import makeloc from "https://deno.land/x/dirname/mod.ts";

const { __dirname } = makeloc(import.meta);

Deno.test({
  name: "stream - parse",
  fn: async () => {
    const csv = Deno.readTextFileSync(path.join(__dirname, "./pl.csv"));
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(csv);
        controller.close();
      },
    });
    const parsed = await parse(stream.getReader());
    assertEquals(parsed.partial, "");
    for (const i in parsed.records) {
      const record = parsed.records[i];
      assertEquals(
        record.counter_t,
        parseInt(i),
        `counter & index mismatch ${record.counter_t}, ${i}`,
      );
    }
    const knownRecord = parsed.records[4110];
    const { humidity, latitude, longitude, pm_1_0, pm_2_5 } = knownRecord;
    assertEquals(humidity, 42.640995, "known record value mismatch");
    assertEquals(latitude, 45.55803, "known record value mismatch");
    assertEquals(longitude, -122.67126, "known record value mismatch");
    assertEquals(pm_1_0, 3, "known record value mismatch");
    assertEquals(pm_2_5, 6, "known record value mismatch");
  },
});
