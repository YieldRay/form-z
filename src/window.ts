import { Window } from "happy-dom";

export const window = (globalThis.window ?? new Window()) as unknown as globalThis.Window;

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props?: Partial<HTMLElementTagNameMap[K]>,
  children?: Iterable<Node>
): HTMLElementTagNameMap[K] {
  const element = window.document.createElement(tagName);
  Object.assign(element, props);
  if (children) {
    for (const child of children) {
      element.appendChild(child);
    }
  }

  return element;
}
