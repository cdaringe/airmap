import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import test from "ava";
import Home from "../home";

// single DOM, so render in serial. could add N containers :shrug:
test.afterEach(() => cleanup());

test.serial("renders airmap!", (t) => {
  const { getByText } = render(<Home />);
  const el = getByText("airmap!");
  t.truthy(el);
});

test.serial("map test present", async (t) => {
  const m = render(<Home />);
  const el = m.getByPlaceholderText(/url/);
  await userEvent.type(el, "bad-url");
  t.truthy(m.getByDisplayValue("bad-url"));
});
