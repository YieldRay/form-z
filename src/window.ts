import { Window } from "happy-dom";
import type { HTMLElementTagNameMapToAttributes } from "./attrs.ts";

export const window = (globalThis.window ??
  new Window()) as unknown as globalThis.Window;

export function createElement<
  K extends keyof HTMLElementTagNameMap &
    keyof HTMLElementTagNameMapToAttributes,
>(
  tagName: K,
  props?: Partial<
    Record<HTMLElementTagNameMapToAttributes[K], string | number | boolean>
  >,
  children?: Iterable<Node | string | null | undefined | false>,
): HTMLElementTagNameMap[K] {
  const element = window.document.createElement(tagName);

  for (const [key, value] of Object.entries(props ?? {})) {
    if (value != undefined && value !== false)
      element.setAttribute(key, value as string);
  }

  if (children) {
    for (const child of children) {
      if (typeof child === "string") {
        element.appendChild(window.document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }

  return element;
}
