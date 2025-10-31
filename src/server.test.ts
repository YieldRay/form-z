import { Ajv } from "ajv";
import { z } from "zod";
import { HTMLFormElement } from "happy-dom";
import { convertSchemaToString } from "./main.tsx";
import { createElement } from "./window.ts";
import { normalizeFormData } from "./payload.ts";

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
    favoriteColor: z
      .array(z.enum(["red", "green", "blue"]))
      .meta({
        uiWidget: "select", // or "checkbox"
      })
      .optional(),
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

const form = createElement("form", {
  method: "POST",
  action: "/form",
  enctype: "multipart/form-data",
}) as unknown as HTMLFormElement;

form.innerHTML = convertSchemaToString(z.toJSONSchema(S));
form.append(createElement("button", { type: "submit" }, ["Submit"]) as any);

export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    if (url.pathname === "/form") {
      const fd = await request.formData();
      const input = normalizeFormData(fd);
      // const result = S.safeParse(obj);
      // return Response.json(result);

      const validate = new Ajv({
        coerceTypes: true,
        strictSchema: false,
      }).compile(z.toJSONSchema(S, { target: "openapi-3.0" }));

      const output = structuredClone(input);
      const valid = validate(output);
      if (valid) {
        return Response.json({ success: true, validate, input, output });
      } else {
        return Response.json({
          success: false,
          validate,
          input,
          errors: validate.errors,
        });
      }
    } else {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form</title>
  <style>
  form, form fieldset { display: flex; flex-direction: column; gap: 1em; max-width: 400px; }
  fieldset:not([name]) { flex-direction: row ; flex-wrap: wrap; }
  label:has(span) { display: flex; gap: 4px }
  input:not([type=radio], [type=checkbox]), select, textarea { flex: 1; }
  </style>
</head>
<body>
  ${form.outerHTML}
</body>
</html>`;
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }
  },
};
