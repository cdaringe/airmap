import { invariant } from "../invariant/mod";

export const fetchTextStreamReader = (url: string, init?: RequestInit) =>
  fetch(url, init)
    .then((response) => response.body)
    .then((body) => {
      const reader = body?.getReader();
      invariant(reader, `missing stream body`);
      return reader;
    });
