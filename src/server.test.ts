import { Ajv } from "ajv";
import { z } from "zod";
import { HTMLFormElement } from "happy-dom";
import { convertSchemaToFormElements } from "./main.ts";
import { createElement } from "./window.ts";
import { unflatten } from "flat";

const S = z.object({
  url: z.url().default("https://example.net"),
  method: z.enum(["GET", "POST"]).default("GET").meta({
    uiWidget: "select", // or "radio"
  }),
  method2: z.enum(["GET", "POST"]).default("GET").meta({
    uiWidget: "radio",
  }),
  user: z.object({
    name: z.string(),
    age: z.number().min(0).max(120).default(0).meta({
      uiWidget: "range", // or "number"
    }),
    age2: z.number().min(0).max(120).default(0).meta({
      uiWidget: "number",
    }),
    favoriteColor: z
      .enum(["red", "green", "blue"])
      .meta({
        uiWidget: "checkbox", // or "select"
        uiMultiple: true,
      })
      .optional(),
    favoriteColor2: z.enum(["red", "green", "blue"]).meta({
      uiWidget: "select",
      uiMultiple: true,
    }),
  }),
  bio: z
    .string()
    .meta({
      uiWidget: "textarea", // or "input"
    })
    .optional(),
});

console.log(z.toJSONSchema(S));

const form = createElement(
  "form",
  {
    method: "POST",
    action: "/form",
    enctype: "multipart/form-data",
  },
  [
    ...convertSchemaToFormElements(z.toJSONSchema(S)),
    createElement("button", { type: "submit" }, ["Submit"]),
  ],
) as unknown as HTMLFormElement;

export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    if (url.pathname === "/form") {
      const fd = await request.formData();
      const obj = unflatten(Object.fromEntries(fd.entries()));
      // const result = S.safeParse(obj);
      // return Response.json(result);

      const validate = new Ajv({
        coerceTypes: true,
        strictSchema: false,
      }).compile(z.toJSONSchema(S, { target: "openapi-3.0" }));

      const valid = validate(obj);
      if (valid) {
        return Response.json({ success: true, data: obj });
      } else {
        return Response.json({ success: false, errors: validate.errors });
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
  label:has(span) { display: flex; gap: 4px }
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
