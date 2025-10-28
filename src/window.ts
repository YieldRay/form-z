import { Window } from "happy-dom";

export const window = (globalThis.window ??
  new Window()) as unknown as globalThis.Window;

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props?: Partial<HTMLElementTagNameMap[K]>,
  children?: Iterable<Node | string>,
): HTMLElementTagNameMap[K] {
  const element = window.document.createElement(tagName);
  Object.assign(element, props);
  if (children) {
    for (const child of children) {
      if (typeof child === "string") {
        element.appendChild(window.document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
  }

  return element;
}
