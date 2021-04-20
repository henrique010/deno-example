import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { router } from "./routes/routes.js";

const host = config().HOST || "127.0.0.1";
const port = config().PORT || "3333";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on PORT 3333");
await app.listen(`${host}:${port}`);
