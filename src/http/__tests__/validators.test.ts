import test from "ava";
import * as v from "../validators";

const sheetUrl = "https://google.com/spreadsheets/d/123";
const sheetUrlGviz = "https://google.com/spreadsheets/d/123/gviz/tq";
test("validators - google sheets", (t) => {
  t.is(v.isGoogleSheetsCompatibleUrl(undefined as unknown as string), false);
  t.is(v.isGoogleSheetsCompatibleUrl("https://wat"), false);
  t.is(v.isGoogleSheetsCompatibleUrl("https://google.com/"), false);
  t.is(
    v.isGoogleSheetsCompatibleUrl("https://google.com/spreadsheets/d"),
    false
  );
  t.is(v.isGoogleSheetsCompatibleUrl(sheetUrl), true);
});

test("validators - google sheet2s", (t) => {
  t.throws(() => v.toSheetsDataExportUrl("https:/a/b/c"), {
    message: /url incompatible/,
  });
  t.is(v.toSheetsDataExportUrl(sheetUrl), sheetUrlGviz);
});
