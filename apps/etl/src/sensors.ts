/**
 * The following list was obtained by zooming over Portland in the map,
 * copying the tokens from the URLs, then writing an inline console script
 * to get the key (primary keys) from the sensor ids.
 * {@link https://map.purpleair.com/1/mAQI/a10/p604800/cC0?select=134026#11.12/45.501/-122.6449}
 */
export const sensorsRaw = [
  [131585, "TIUT9AE1GN9U9IXK"],
  [132859, "M8D5BF5M35ATJCSX"],
  [133043, "OJVO5AB9V0UB3EIU"],
  [2045, "QUM9CKXZMZN7XF27"],
  [133373, "UYSFQGUILUB29PVI"],
  [133946, "L2WWGOSSVH3OX6Z4"],
  [134026, "KED3XSHG9IDIJIXZ"],
  [3404, "JAFQ0QMO71286MCL"],
  [3519, "VB73FXIA7B9J341E"],
  [134636, "Q9GO59RWUU6KAQTR"],
  [134920, "I0MEVN8VSLBU1FLU"],
  [5826, "2JZVKFP2UPPFEHJN"],
  [7292, "DEGG80O1P42Q0B2S"],
  [7568, "KIW11D2Q3XC2SYOW"],
  [9814, "XCHCW5552LTSHFEA"],
  [10512, "MSY3NBF3A1IHXR1X"],
  [142240, "9CXTQJETQ3UISWIJ"],
  [14923, "7IS5Y0O28M7TXYLW"],
  [15187, "WV9WUM02SRITKOKT"],
  [15793, "7Z6MK3ONXFFW5H3V"],
  [16007, "O9QOMTSQ9GWJH2NA"],
  [18139, "DYMLJ110SDIUK03M"],
  [21429, "T2LNB88LSFZQTNJH"],
  [21567, "VZYO8D5697L8QLI1"],
  [22983, "NPXE5BF4J07CF793"],
  [23361, "6W9FRRJFH8XS1OZL"],
  [24273, "OQ4YTW8FX3YC37KP"],
  [26477, "H7NCF9AE9BNCFNI7"],
  [26739, "BD73LTNOUV0XNQO7"],
  [26757, "MZVFVRFZQN4JTQZB"],
  [27467, "QMBZ32ECB2NY7PAI"],
  [34247, "IW9Y9MCLGUFPT4EQ"],
  [34409, "YL5RB11P46X4N6LT"],
  [38447, "91ITEYWHN4MTA5IK"],
  [38591, "PCMCASHX8JMGAQG1"],
  [39215, "5XG6O876K0L4ZY7Q"],
  [40681, "GH5C8CLG9NO7QZVU"],
  [43023, "C2WIY0PSPNWPWV6E"],
  [61341, "8QZIOHNFD6HQRPPY"],
  [64339, "CVI9NV9TEBFOCG3Z"],
  [70851, "L3GTIF7NGCRH09PZ"],
  [70879, "YJNV69GX7X5U6OG2"],
  [71669, "5ZJLFI99YWPZG4MT"],
  [74223, "OQA0IA3EB2ZUC110"],
  [74901, "H23GSY21M8R53JTA"],
  [75007, "5MKPX8KS1YGCO4HK"],
  [75359, "RRXETJL4PO8N9KGS"],
  [75487, "SWLZ15TOQBZ2BGBO"],
  [75599, "UDEHNI2AG4YJ8AZ0"],
  [75613, "VN9OXWIK02A2MU82"],
  [75861, "CEZ79QFT4C9D9ZLK"],
  [75995, "BFX1H0IA80H9EIVM"],
  [76231, "U85IY7US25XHJH7E"],
  [76315, "MUFG0H9HRRMYSD9Z"],
  [76585, "KP2JFLPGZMY1662B"],
  [76631, "XCKCVHQWYMDPMV8J"],
  [77133, "PHRK6QLIBTXRW1YE"],
  [77199, "8DG4CYGK3WZEU9OI"],
  [77245, "C633O3XAJLJXXMRY"],
  [77561, "2GO87I9A5JWVFJSR"],
  [77695, "8UMHBDL9X1Q5IJ8L"],
  [77717, "ZT03NF0A2E6IRVMK"],
  [77777, "QF64NWX6V7SW1V30"],
  [78135, "T37B779364UMIAX6"],
  [78151, "A62AH8QAX1LU8I7N"],
  [78763, "WYR6TNVLFF9ITS3U"],
  [78989, "N0L8NA8OK4YATPRG"],
  [79133, "IXR4LF8ZKRZI4CZ6"],
  [79209, "J59DB62PLSIUBT25"],
  [79245, "LN4AITTA2ICVT5UT"],
  [79935, "57PTC7LOCXAJBNVG"],
  [80015, "KQ9NJLH0KBBH6NN8"],
  [80103, "CNQXZ2XNAUA8H6GJ"],
  [80191, "WBTMEUD8L6JA88PK"],
  [80441, "6EJFQL05I6GUTJT7"],
  [80739, "I992T13LVIRNSF1M"],
  [80855, "04Z8I1NFIDZDWR5R"],
  [80867, "NLQ0EWT9JR5KC09X"],
  [80941, "SNR8IKI6UGMHBKKG"],
  [81045, "BA3XL4U88E3AS67V"],
  [81179, "J0443B5EM4AYUQVX"],
  [81377, "Z64IBVFO7D0ZL0MP"],
  [82059, "UPN8G7UUS22UWAPP"],
  [82083, "QST1U8Y6MLQJFC4M"],
  [82251, "Z52Y742G3L15IH8S"],
  [82419, "EEDUAWYVXQDHXIS6"],
  [82455, "SZA17NI7K6BXKD46"],
  [82525, "1Q757RJSJGNJFL1P"],
  [82579, "F78MZ8QPSR0XF28Q"],
  [84087, "2JQ0DDI6K1D9HBPS"],
  [84227, "6QXT5IX17UL2RSWB"],
  [84355, "WWFB0CH9GNANILNY"],
  [85143, "PZS3I1FRT9810O60"],
  [85233, "6PBUCU7V1451BKFA"],
  [85937, "E3PS9RVD1B3SQ1ID"],
  [86223, "FKVMUR6LSNMR07KP"],
  [86713, "43CWG03V326TUHY7"],
  [87245, "H7VF2CMUBVVJUEOU"],
  [87421, "GO4IRTGGG13YC1SO"],
  [87521, "K8MM6TBWZBZAY7Y7"],
  [87619, "V036QYLYU6DZLHYK"],
  [89309, "MMT9RZDSWH5X68LS"],
  [89887, "H4RUQM489A1WBKAF"],
  [90055, "TOQNB4F258KW98AW"],
  [90121, "6BBS0HW7KP8S6X4I"],
  [90195, "YS7593UF77WQCC94"],
  [91827, "4HKVR0GUVPN3VEKD"],
  [91853, "VYMMCC5C0FHQER14"],
  [91855, "ZO5WF4YG8FM6NT6H"],
  [91861, "ZO59HL9AUCN56JZO"],
  [91903, "7HNNJ25VXF2PMGSQ"],
  [93429, "4OG3GK99Y88Y2JFR"],
  [94449, "NX871YG29PICW7KP"],
  [94687, "MM8F2VR0XDNHHGZT"],
  [97609, "LB651MDS00IY6E1E"],
  [97819, "WTBWBYCOSEBZ9ENI"],
  [97879, "B5W8T7OG6A4ZMXQB"],
  [98031, "9XTQXUSW0WQIO9TT"],
  [98053, "5Q5DN1DIRI8C9KCA"],
  [98063, "36EYLAJ0HBUK2BI7"],
  [98813, "5KAT6M4PIR0QCGHG"],
  [100809, "MSFUYPGZMS5FK4J5"],
  [100885, "4PPVQQ6JPB0095FQ"],
  [100893, "DY1Z20T8UST4SXQA"],
  [100921, "68RX3V8R1SG3CDH3"],
  [100949, "BNNIXABY11ILKMWH"],
  [101161, "XUK96AGP62THR79R"],
  [101171, "ELBCVMZREQWT4IAW"],
  [101699, "W4UPVRK5DGP5N6A3"],
  [101988, "NB5ZIBIWB02G9SJW"],
  [103746, "O9NJXLLN77K8FMJK"],
  [103836, "701RNSCH3ELSYJFS"],
  [104064, "QVR4LK9CUD4774JA"],
  [104320, "N13PGOQPW0O6XPQA"],
  [105044, "7RMGCI61B87GIT7P"],
  [106966, "920CJEEV4XW2S4WI"],
  [107568, "3Z259C070DRZV2I4"],
  [108264, "X4OKNLL4MXZQYGCY"],
  [110060, "P66QYKWN3LMUNSI3"],
  [110114, "RCNX2TJXMBS1033I"],
  [110510, "E9QQ09DFU77L77IP"],
  [110546, "HP06EOK8KDAYC6TE"],
  [110670, "J9Q9S8M4JXLWDVGR"],
  [110690, "U43I9PW7RNGA1JY1"],
  [110838, "I9UOQJL78Y6M3RG4"],
  [112502, "M71EALS8J95BHNY7"],
  [112728, "6MXNLJZ6EHVP7D9V"],
  [113574, "SQ3MLHZPCC79N51S"],
  [114551, "VB4BJMM3CSDWIF5F"],
  [114555, "5WYAVAAGLZIG6AQD"],
  [116155, "11EIQBYHD0S0YI2I"],
  [116617, "O3GEY1DGDF6SL4NC"],
  [118027, "LEMV49UGDPRCBQIH"],
  [119803, "WX56NFNFO2CPF9X2"],
  [120479, "JGA745KQ2D3RQYX2"],
  [120749, "A1BXJP2PZLN7NN9U"],
  [121253, "WFN0EV6MNS8FLKOU"],
  [121349, "47NIJKUBXTLWPKH7"],
  [122737, "C9CSY8QIHUNKS0NU"],
  [123163, "PKGQBPROF4O164E0"],
  [123865, "IDJFW3G9EZEW9XEV"],
  [126135, "RLMS1Y6J3F7NQFMK"],
  [126495, "9HONTVE4BD6OU4FB"],
  [126931, "9043GQORIJBX2NAK"],
  [126933, "U677XZX4NXXGVAOQ"],
  [127467, "TVZ0PH1BQKLS5TDH"],
  [127985, "0KAM2VHLJ07FBN6M"],
] as const;

export const sensors = sensorsRaw.map(([sensorIndex, key]) => ({
  key,
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