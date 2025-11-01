import { z } from "zod";
import { RenderSchemaToHonoForm, type ObjectSchema } from "./render.tsx";
import { normalizeFormData } from "./payload.ts";
import { validateFormData } from "./validate.ts";
import { html } from "hono/html";

const S = z.object({
  url: z.url().default("https://example.net").describe("URI"),
  method: z.enum(["GET", "POST"]).default("GET").meta({
    uiWidget: "select", // or "radio"
  }),
  method2: z.enum(["GET", "POST"]).default("GET").meta({
    uiWidget: "radio",
  }),
  user: z.object({
    name: z.string().describe("First-name Last-name"),
    age: z.int().min(0).max(120).default(0).meta({
      uiWidget: "range", // or "number"
    }),
    age2: z.number().min(0).max(120).default(0).meta({
      uiWidget: "number",
    }),
    avatar: z.file().optional(),
    favoriteColor: z.array(z.enum(["red", "green", "blue"])).meta({
      uiWidget: "select", // or "checkbox"
    }),
    favoriteColor2: z.array(z.enum(["red", "green", "blue"])).optional(),
  }),
  bio: z
    .string()
    .meta({
      uiWidget: "textarea", // or "input"
    })
    .optional(),
});

console.log(JSON.stringify(z.toJSONSchema(S), null, 2));

export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    if (url.pathname === "/form") {
      const fd = await request.formData();
      const input = normalizeFormData(fd);
      return Response.json({
        input,
        ...validateFormData(z.toJSONSchema(S) as ObjectSchema, fd),
      });
    } else {
      const htmlString = await html/* html */ `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Form</title>
            <style>
              @import "//unpkg.com/landsoul";
              form {
                max-width: 400px;
              }
              :where(form, form fieldset > *) {
                display: flex;
                flex-direction: column;
                gap: 8px;
              }
              :where(form > *, form fieldset > * > *) {
                display: flex;
                gap: 8px;
                & > :first-child:not(legend) {
                  min-width: 120px;
                }
                & > :last-child {
                  flex: 1;
                }
              }
            </style>
          </head>
          <body>
            ${html`${(
              <RenderSchemaToHonoForm
                schema={z.toJSONSchema(S) as ObjectSchema}
                method="post"
                action="/form"
                enctype="multipart/form-data"
              >
                <button type="submit" style="width: 100%">
                  Submit
                </button>
              </RenderSchemaToHonoForm>
            )}`}
          </body>
        </html>`;
      return new Response(htmlString, {
        headers: { "Content-Type": "text/html" },
      });
    }
  },
};
