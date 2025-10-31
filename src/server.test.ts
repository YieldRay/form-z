import { z } from "zod";
import { HTMLFormElement } from "happy-dom";
import { convertSchemaToString } from "./render.tsx";
import { createElement } from "./test-utils.ts";
import { normalizeFormData } from "./payload.ts";
import { validateFormData } from "./validate.ts";

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

const form = createElement("form", {
  method: "POST",
  action: "/form",
  enctype: "multipart/form-data",
}) as unknown as HTMLFormElement;

form.innerHTML = convertSchemaToString(z.toJSONSchema(S));
form.append(
  createElement("button", { type: "submit", style: "width: 100%" }, [
    "Submit",
  ]) as any
);

export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    if (url.pathname === "/form") {
      const fd = await request.formData();
      const input = normalizeFormData(fd);
      return Response.json({
        input,
        ...validateFormData(S, fd),
      });
    } else {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form</title>
  <style>
  @import '//unpkg.com/landsoul';
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
  ${form.outerHTML}
</body>
</html>`;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }
  },
};
