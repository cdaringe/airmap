import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { isGoogleSheetsCompatibleUrl, toSheetsDataExportUrl } from "./mod.ts";

const sheetUrl = "https://google.com/spreadsheets/d/123";
const sheetUrlExport = "https://google.com/spreadsheets/d/123/export";

Deno.test({
  name: "toSheetsDataExportUrl",
  fn: () => {
    assertEquals(toSheetsDataExportUrl(sheetUrl), sheetUrlExport);
  },
});

Deno.test({
  name: "compatible url",
  fn: () => {
    assertEquals(
      isGoogleSheetsCompatibleUrl(undefined as unknown as string),
      false
    );
    assertEquals(isGoogleSheetsCompatibleUrl("https://wat"), false);
    assertEquals(isGoogleSheetsCompatibleUrl("https://google.com/"), false);
    assertEquals(
      isGoogleSheetsCompatibleUrl("https://google.com/spreadsheets/d"),
      false
    );
    assertEquals(isGoogleSheetsCompatibleUrl(sheetUrl), true);
  },
});
