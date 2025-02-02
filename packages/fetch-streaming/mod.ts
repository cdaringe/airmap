import { invariant } from "../invariant/mod";

export const fetchTextStreamReader = (url: string, init?: RequestInit) =>
  fetch(url, init)
    .then((response) => response.body)
    .then((body) => {
      const reader = body?.getReader();
      invariant(reader, `missing stream body`);
      return reader;
    });

export async function* readLines(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      if (buffer) {
        yield buffer; // Yield any remaining data as the last line
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    let lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // Keep the last partial line in the buffer

    for (const line of lines) {
      yield line;
    }
  }
}
