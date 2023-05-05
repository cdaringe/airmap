import {
  getMiniWras,
  getPocket,
} from "../src/components/pages/map/hooks/use-sensor-mapping-resources";
import { FileUploader } from "react-drag-drop-files";

function Convert() {
  async function handleFilesChanged(file: File) {
    const mod = await getPocket();
    const { records } = await mod.stream.parse(file.stream().getReader());
    generateGpx(
      records.map((x) => ({
        lat: x.latitude,
        lon: x.longitude,
        date: x.date,
      }))
    );
  }
  return (
    <div>
      <h2>PocketLabs to GPX</h2>
      <FileUploader handleChange={handleFilesChanged} />
    </div>
  );
}

export default Convert;

function generateGpx(xs: { lat: number; lon: number; date: Date }[]) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="StravaGPX iPhone" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <time${xs[0]!.date.toISOString()}</time>
  </metadata>
  <trk>
    <name>Walk</name>
    <type>10</type>
    <trkseg>
${xs
  .map((x) =>
    `
<trkpt lat="${x.lat}" lon="${x.lon}">
  <ele>0</ele>
  <time>${x.date.toISOString()}</time>
</trkpt>
`.trim()
  )
  .join("\n")}
    </trkseg>
  </trk>
</gpx>
`;
  download(content, "text", "converted.gpx");
}

function download(content: BlobPart, mimeType: string, filename: string) {
  const a = document.createElement("a"); // Create "a" element
  const blob = new Blob([content], { type: mimeType }); // Create a blob (file-like object)
  const url = URL.createObjectURL(blob); // Create an object URL from blob
  a.setAttribute("href", url); // Set "a" element link
  a.setAttribute("download", filename); // Set download filename
  a.click(); // Start downloading
}
