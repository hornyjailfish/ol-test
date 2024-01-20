import { Hono, HonoRequest } from "https://deno.land/x/hono@v3.5.5/mod.ts";
import {
  logger,
  serveStatic,
} from "https://deno.land/x/hono@v3.5.5/middleware.ts";

// import Surreal from "https://deno.land/x/surrealdb/mod.ts";

// const db = new Surreal();

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));
// app.use("/public/*", serveStatic({ root: "./" }));
// app.use("/css/*", serveStatic({ root: "./" }));

// TODO: handle stuff here
// app.get("/db/*", async (c) => {
//   const data = await db_sign();
//   return c.json(data);
// });
app.get("/", serveStatic({ path: "./static/index.html" }));
// app.use("/map", (c, next) => {
//   // console.log(map);
//   map.setTarget("#canvas");
//   return next();
// });

app.use("*", logger());
app.showRoutes();
app.onError((e, c) => {
  console.error(e);
  // app.get("*", serveStatic({ path: "./static/404.html" }));
  return c.html(
    `<div hx-target="this" class="w3-center w3-card-4 w3-red"><h1>${e}</h1></div>`,
    400,
  );
});

Deno.serve({ port: 3000 }, app.fetch);
