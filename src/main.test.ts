import { test } from "node:test";
import * as assert from "node:assert";

import { z } from "zod";
import { Window, Node, HTMLFormElement } from "happy-dom";
import { convertZodToFormElements } from "./main.ts";
import { createElement } from "./window.ts";
import { unflatten } from "flat";

test("test", async () => {
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
    convertZodToFormElements(S),
  ) as unknown as HTMLFormElement;

  console.log(form.outerHTML);
  assert.ok(typeof form.outerHTML === "string");

  const { document, FormData } = new Window();
  document.body.appendChild(form);

  await new Promise((r) => {
    form.addEventListener("submit", r);
    form.requestSubmit();
  });

  const fd = new FormData(form);
  const obj = unflatten(Object.fromEntries(fd.entries()));

  console.log(JSON.stringify(obj, null, 2));
  assert.deepStrictEqual(obj, {
    url: "",
    method: "GET",
    user: {
      name: "",
      age: "",
    },
    bio: "",
  });
});
