import * as dotenv from "dotenv";

dotenv.config({ debug: true, override: true });

import("./etl").then((mod) => mod.run(), console.error);
