import closestTo from "https://deno.land/x/date_fns@v2.22.1/closestTo/index.js";
import { createModule } from "./mod.ts";

export const moduleResources = { closestTo };
export default createModule(moduleResources);