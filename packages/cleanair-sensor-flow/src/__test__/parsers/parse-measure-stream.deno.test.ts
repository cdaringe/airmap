import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { parse } from "../../streams/parse-measure-stream.ts";

const csv = `timestamp,date (UTC),NO2 (ppb),VOC (ppb),pm 10 (ug/m3),pm 2.5 (ug/m3),NO2 (Plume AQI),VOC (Plume AQI),pm 10 (Plume AQI),pm 2.5 (Plume AQI)
1640991926,2021-12-31 23:05:26,181,147,8.939624786,1.022272468,135,12,9,2
1640991986,2021-12-31 23:06:26,198,125,7.058031559,1.045340896,143,10,7,2
1640992046,2021-12-31 23:07:26,211,119,10.38281059,2.265813351,149,10,10,5
1640992106,2021-12-31 23:08:26,219,115,10.76237297,1.892334819,153,9,11,4
1640992166,2021-12-31 23:09:26,223,114,10.29409695,1.523564577,155,9,10,3
1640992226,2021-12-31 23:10:26,227,116,10.68168354,2.044255733,157,9,11,4
1640992286,2021-12-31 23:11:26,235,117,9.999290466,1.986427069,161,9,10,4
1640992346,2021-12-31 23:12:26,237,120,13.07493305,2.555168867,161,10,13,5
1640992406,2021-12-31 23:13:26,236,123,8.924043655,1.4605726,161,10,9,3
1640992466,2021-12-31 23:14:26,178,133,9.760458946,1.278054237,134,11,10,3
1640992526,2021-12-31 23:15:26,143,143,4.554388523,1.106289625,117,11,5,2
1640992586,2021-12-31 23:16:26,147,155,10.79273224,1,119,12,11,2
1640992646,2021-12-31 23:17:26,161,149,9.899353027,1.676469207,126,12,10,3
1640992706,2021-12-31 23:18:26,182,148,4.098315239,1,136,12,4,2
1640992766,2021-12-31 23:19:26,232,138,2.227067471,1,159,11,2,2
1640992826,2021-12-31 23:20:26,286,58,12.01413918,1.642775774,185,5,12,3
1640992886,2021-12-31 23:21:26,259,60,5.403028011,1.598580837,172,5,5,3
1640992946,2021-12-31 23:22:26,256,40,6.688523769,1,170,3,7,2
1640993006,2021-12-31 23:23:26,244,52,4.030676842,1,165,4,4,2`;

Deno.test({
  name: "stream - parse",
  fn: async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(csv);
        controller.close();
      },
    });
    const parsed = await parse(stream.getReader());
    assertEquals(parsed.partial, "");
    assertEquals(parsed.records[0], {
      date: new Date(1640991926 * 1000),
      pm_2_5: 1.022272468,
      voc_ppb: 147,
    });
    assertEquals(parsed.records.length, 19);
  },
});