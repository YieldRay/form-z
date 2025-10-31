import { test } from "node:test";
import * as assert from "node:assert";

import { z } from "zod";
import { Window, HTMLFormElement } from "happy-dom";
import { convertSchemaToString } from "./render.tsx";
import { createElement } from "./test-utils.ts";
import { normalizeFormData } from "./payload.ts";

test("test", async () => {
  const S = z.object({
    url: z.url(),
    method: z
      .enum(["GET", "POST"])
      .meta({
        uiWidget: "select", // or "radio"
      })
      .default("POST"),
    user: z.object({
      name: z.string().min(1).max(100),
      age: z.number().min(0).max(120).meta({
        uiWidget: "range", // or "number"
      }),
      favoriteColor: z.enum(["red", "green", "blue"]).meta({
        uiWidget: "checkbox", // or "select"
        multiple: true,
      }),
    }),
    bio: z.string().meta({
      uiWidget: "textarea", // or "input"
    }),
  });

  const form = createElement("form", {
    method: "POST",
    target: "https://node.deno.dev",
  }) as unknown as HTMLFormElement;

  const innerHTML = convertSchemaToString(z.toJSONSchema(S));
  form.innerHTML = innerHTML;

  console.log(form.outerHTML);
  assert.ok(typeof form.outerHTML === "string");

  const { document, FormData } = new Window();
  document.body.appendChild(form);

  const fd = new FormData(form) as unknown as globalThis.FormData;
  const obj = normalizeFormData(fd);

  console.log(JSON.stringify(obj, null, 2));
  assert.deepStrictEqual(obj, {
    url: "",
    method: "POST",
    user: {
      name: "",
      age: "",
    },
    bio: "",
  });
});
