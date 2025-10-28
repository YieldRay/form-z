import { z } from "zod";
import { window, createElement } from "./window.ts";

export function convertSchemaToFormElements(
  schema: z.core.JSONSchema.BaseSchema,
  parent?: string,
): Array<HTMLElement> {
  if (schema.type !== "object") {
    throw new Error("Root schema must be of type object");
  }
  const fragment = window.document.createDocumentFragment();
  if (!schema.properties) return [];
  const requiredKeys = new Set(schema.required);

  for (const [key, value] of Object.entries(schema.properties)) {
    if (typeof value === "boolean" || !value.type)
      throw new Error(
        `Unsupported schema type for field "${key}", missing type`,
      );

    const { uiWidget, uiMultiple, default: defaultValue } = value;
    const required = requiredKeys.has(key);
    const name = parent ? `${parent}.${key}` : key;

    switch (value.type) {
      case "string":
        {
          if (value.enum) {
            if (uiMultiple) {
              // select[multiple]
              if (uiWidget === "select") {
                fragment.appendChild(
                  createElement("label", {}, [
                    createElement("span", { textContent: key }),
                    createElement(
                      "select",
                      { name, multiple: true, required },
                      value.enum.map((optionValue) =>
                        createElement("option", {
                          value: String(optionValue),
                          textContent: String(optionValue),
                          defaultSelected: defaultValue === optionValue,
                        }),
                      ),
                    ),
                  ]),
                );
              } else {
                // input[type=checkbox]
                fragment.appendChild(
                  createElement("fieldset", {}, [
                    createElement("legend", { textContent: key }),
                    ...value.enum.map((optionValue) =>
                      createElement("label", {}, [
                        createElement("input", {
                          type: "checkbox",
                          name,
                          value: String(optionValue),
                          required,
                          defaultChecked: defaultValue === optionValue,
                        }),
                        createElement("span", {
                          textContent: String(optionValue),
                        }),
                      ]),
                    ),
                  ]),
                );
              }
            } else {
              // select
              if (uiWidget === "select") {
                fragment.appendChild(
                  createElement("label", {}, [
                    createElement("span", { textContent: key }),
                    createElement(
                      "select",
                      { name, required },
                      value.enum.map((optionValue) =>
                        createElement("option", {
                          value: String(optionValue),
                          textContent: String(optionValue),
                          defaultSelected: defaultValue === optionValue,
                        }),
                      ),
                    ),
                  ]),
                );
              } else {
                // input[type=radio]
                fragment.appendChild(
                  createElement("fieldset", {}, [
                    createElement("legend", { textContent: key }),
                    ...value.enum.map((optionValue) =>
                      createElement("label", {}, [
                        createElement("input", {
                          type: "radio",
                          name,
                          value: String(optionValue),
                          required,
                          defaultChecked: defaultValue === optionValue,
                        }),
                        createElement("span", {
                          textContent: String(optionValue),
                        }),
                      ]),
                    ),
                  ]),
                );
              }
            }
          } else if (value.format === "uri") {
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", { textContent: key }),
                createElement("input", {
                  name,
                  type: "url",
                  required,
                  defaultValue: String(defaultValue),
                }),
              ]),
            );
          } else if (uiWidget === "textarea") {
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", { textContent: key }),
                createElement("textarea", { name, required }),
              ]),
            );
          } else {
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", { textContent: key }),
                createElement("input", {
                  name,
                  type: "text",
                  required,
                }),
              ]),
            );
          }
        }
        break;
      case "number":
        {
          fragment.appendChild(
            createElement("label", {}, [
              createElement("span", { textContent: key }),
              createElement("input", {
                name,
                type: uiWidget === "range" ? "range" : "number",
                min: String(value.minimum),
                max: String(value.maximum),
              }),
            ]),
          );
        }
        break;
      case "boolean":
        {
          fragment.appendChild(
            createElement("label", {}, [
              createElement("span", { textContent: key }),
              createElement("input", {
                name,
                type: "checkbox",
              }),
            ]),
          );
        }
        break;
      case "object":
        {
          fragment.appendChild(
            createElement("fieldset", {}, [
              createElement("legend", { textContent: key }),
              ...convertSchemaToFormElements(value, name),
            ]),
          );
        }
        break;
      default:
        throw new Error(
          `Unsupported schema type for field "${name}", got "${value.type}"`,
        );
    }
    fragment.appendChild(window.document.createTextNode("\n"));
  }

  return Array.from(fragment.childNodes) as Array<HTMLElement>;
}
