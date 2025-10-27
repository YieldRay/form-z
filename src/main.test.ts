import { test } from "node:test";
import * as assert from "node:assert";

import { z } from "zod";
import { convertZodToFormElements } from "./main.ts";
import { createElement } from "./window.ts";

test("test", () => {
  const S = z.object({
    url: z.url(),
    method: z.enum(["GET", "POST"]).meta({
      uiWidget: "select", // or "radio"
    }),
    user: z.object({
      name: z.string(),
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

  const form = createElement(
    "form",
    {
      method: "POST",
      url: "https://node.deno.dev",
    },
    convertZodToFormElements(S)
  );

  console.log(form.outerHTML);
  assert.ok(typeof form.outerHTML === "string");
});
