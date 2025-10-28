import { z } from "zod";
import { window, createElement } from "./window.ts";

type AtomSchema = z.ZodString | z.ZodNumber | z.ZodDate | z.ZodFile | z.ZodBoolean | z.ZodEnum | z.ZodObject;

export function convertZodToFormElements(schema: z.ZodObject, parent?: string): Array<HTMLElement> {
  const fragment = window.document.createDocumentFragment();

  for (const [key, _value] of Object.entries(schema.shape)) {
    const value = _value as AtomSchema;

    if (value instanceof z.ZodObject) {
      const fieldset = createElement("fieldset", {}, [
        window.document.createTextNode("\n"),
        createElement("legend", { textContent: key }),
        ...convertZodToFormElements(value, parent ? `${parent}.${key}` : key),
      ]);
      fragment.appendChild(fieldset);
    } else {
      const label = createElement("label", { textContent: key });
      fragment.appendChild(label);

      const name = parent ? `${parent}.${key}` : key;
      const meta = value.meta();
      const uiWidget = meta?.uiWidget as string | undefined;

      if (value instanceof z.ZodString) {
        if (uiWidget === "textarea") {
          const textarea = createElement("textarea", {
            name,
          });
          label.appendChild(textarea);
        } else {
          const input = createElement("input", {
            name,
            type: "text",
          });
          label.appendChild(input);
        }
      } else if (value instanceof z.ZodURL) {
        const input = createElement("input", {
          name,
          type: "url",
        });
        label.appendChild(input);
      } else if (value instanceof z.ZodDate) {
        const input = createElement("input", {
          name,
          type: "datetime-local",
        });
        label.appendChild(input);
      } else if (value instanceof z.ZodFile) {
        const input = createElement("input", {
          name,
          type: "file",
        });
        fragment.appendChild(input);
      } else if (value instanceof z.ZodBoolean) {
        const input = createElement("input", {
          name,
          type: "checkbox",
        });
        label.appendChild(input);
      } else if (value instanceof z.ZodNumber) {
        // uiWidget: "range" | "number"
        if (uiWidget === "range") {
          const input = createElement("input", {
            name,
            type: "range",
            min: (value.minValue as number | undefined)?.toString(),
            max: (value.maxValue as number | undefined)?.toString(),
          });
          label.appendChild(input);
        } else {
          const input = createElement("input", {
            name,
            type: "number",
          });
          label.appendChild(input);
        }
      } else if (value instanceof z.ZodEnum) {
        if (meta?.multiple) {
          // uiWidget: "select" | "checkbox"
          if (uiWidget === "select") {
            const select = createElement(
              "select",
              { name, multiple: true },
              value.options.map((optionValue) =>
                createElement("option", {
                  value: String(optionValue),
                  textContent: String(optionValue),
                })
              )
            );
            label.appendChild(select);
          } else {
            // defaults to "checkbox"
            for (const optionValue of value.options) {
              const checkboxLabel = createElement("label", { textContent: String(optionValue) });
              const checkboxInput = createElement("input", {
                type: "checkbox",
                name,
                value: String(optionValue),
              });
              checkboxLabel.appendChild(checkboxInput);
              label.appendChild(checkboxLabel);
            }
          }
        } else {
          // uiWidget: "select" | "radio"
          if (uiWidget === "select") {
            const select = createElement(
              "select",
              { name },
              value.options.map((optionValue) =>
                createElement("option", {
                  value: String(optionValue),
                  textContent: String(optionValue),
                })
              )
            );
            label.appendChild(select);
          } else {
            // defaults to "radio"
            for (const optionValue of value.options) {
              const radioLabel = createElement("label", { textContent: String(optionValue) });
              const radioInput = createElement("input", {
                type: "radio",
                name,
                value: String(optionValue),
              });
              radioLabel.appendChild(radioInput);
              label.appendChild(radioLabel);
            }
          }
        }
      } else {
        throw new Error(`Unsupported schema type for field "${name}"`);
      }
    }
    // add line break
    fragment.appendChild(window.document.createTextNode("\n"));
  }

  return Array.from(fragment.childNodes) as Array<HTMLElement>;
}
