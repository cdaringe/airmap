/**
 * The following list was obtained by zooming over Portland in the map,
 * copying the tokens from the URLs, then writing an inline console script
 * to get the key (primary keys) from the sensor ids.
 * {@link https://map.purpleair.com/1/mAQI/a10/p604800/cC0?select=134026#11.12/45.501/-122.6449}
 */
export const sensorsRaw = [
  133946, 98813, 9814, 98063, 98053, 98031, 97879, 97819, 97609, 94687, 94449,
  93429, 91903, 91861, 91855, 91853, 91827, 90195, 90121, 90055, 89887, 89309,
  87619, 87521, 87421, 87245, 86713, 86223, 85937, 85233, 85143, 84355, 84227,
  84087, 82579, 82525, 82455, 82419, 82251, 82083, 82059, 81377, 81179, 81045,
  80941, 80867, 80855, 80739, 80441, 80191, 80103, 80015, 79935, 79245, 79209,
  79133,
  // 78989,
  78763, 78151, 78135, 77777, 77717, 77695, 77561, 77245, 77199, 77133, 76631,
  76585, 76315, 76231, 75995, 75861, 7568, 75613, 75599, 75487, 75359, 75007,
  74901, 74223, 7292, 71669, 70879, 70851, 64339, 61341, 5826, 43023, 40681,
  39215, 38591, 38447, 3519, 34409, 34247, 3404, 27467, 26757, 26739, 26477,
  24273, 23361, 22983, 21567, 21429, 2045, 18139, 16007, 15793, 152432, 15187,
  14923, 142240, 134920, 134636, 134026, 133373, 133043, 132859, 131585, 127985,
  127467, 126933, 126931, 126495, 126135, 123865, 123163, 122737, 121349,
  121253, 120749, 120479, 119803, 118027, 116617, 116155, 114555, 114551,
  113574, 112728, 112502, 110838, 110690, 110670, 110546, 110510, 110114,
  110060, 108264, 107568, 106966, 10512, 105044, 104320, 104064, 103836, 103746,
  101988, 101699, 101171, 101161, 100949, 100921, 100901, 100895, 100893,
  100885, 100809,
] as const;

export const sensors = sensorsRaw.map((sensorIndex) => ({
  sensorIndex,
}));

/**
 * Hacky little browser scripts to get the good stuff.
 * Paste into console and call getem()
 */
/*
var token = "EXTRACT_FROM_URL";
async function getem() {
  let idkey = [];
  for (const [id, _, description] of v.data) {
    console.log(`${id} ${description}`);
    const sensorMeta = await fetch(
      `/v1/sensors/${id}?token=${token}&fields=primary_id_a,primary_key_a,primary_id_b,primary_key_b,secondary_id_a,secondary_key_a,secondary_id_b,secondary_key_b,channel_flags_auto,channel_flags_manual,temperature_a,hardware,firmware_version,rssi,firmware_upgrade,firmware_version,pm2.5_10minute,pm2.5_30minute,pm2.5_60minute,pm2.5_6hour,pm2.5_24hour,pm2.5_1week`,
      {
        headers: {
          accept: "application/json",
        },
      }
    ).then((r) => r.json());
    const {
      sensor: { primary_key_a },
    } = sensorMeta;
    idkey.push([id, primary_key_a]);
  }
  console.log(JSON.stringify(idkey));
}
*/
