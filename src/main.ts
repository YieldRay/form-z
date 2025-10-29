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

    const { uiWidget, default: defaultValue, description } = value;
    const defaultValueString =
      defaultValue == undefined ? undefined : String(defaultValue);
    const required = requiredKeys.has(key);
    const name = parent ? `${parent}.${key}` : key;

    switch (value.type) {
      case "string":
        {
          if (value.enum) {
            // select
            if (uiWidget === "select") {
              fragment.appendChild(
                createElement("label", {}, [
                  createElement("span", {}, [key]),
                  createElement(
                    "select",
                    { name, required },
                    value.enum.map((optionValue) =>
                      createElement(
                        "option",
                        {
                          value: String(optionValue),
                          selected: defaultValue === optionValue,
                        },
                        [String(optionValue)],
                      ),
                    ),
                  ),
                ]),
              );
            } else {
              // input[type=radio]
              fragment.appendChild(
                createElement("fieldset", {}, [
                  createElement("legend", {}, [key]),
                  ...value.enum.map((optionValue) =>
                    createElement("label", {}, [
                      createElement("input", {
                        type: "radio",
                        name,
                        value: String(optionValue),
                        required,
                        checked: defaultValue === optionValue,
                        placeholder: description,
                      }),
                      createElement("span", {}, [String(optionValue)]),
                    ]),
                  ),
                ]),
              );
            }
          } else if (value.format === "uri") {
            // input[type=url]
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", {}, [key]),
                createElement("input", {
                  name,
                  type: "url",
                  required,
                  value: defaultValueString,
                  minlength: value.minLength,
                  maxlength: value.maxLength,
                  placeholder: description,
                }),
              ]),
            );
          } else if (uiWidget === "textarea") {
            // textarea
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", {}, [key]),
                createElement(
                  "textarea",
                  {
                    name,
                    required,
                    minlength: value.minLength,
                    maxlength: value.maxLength,
                    placeholder: description,
                  },
                  [defaultValueString],
                ),
              ]),
            );
          } else {
            // input[type=text]
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", {}, [key]),
                createElement("input", {
                  name,
                  type: "text",
                  required,
                  value: defaultValueString,
                  minlength: value.minLength,
                  maxlength: value.maxLength,
                  pattern: value.pattern,
                  placeholder: description,
                }),
              ]),
            );
          }
        }
        break;
      case "number":
      case "integer":
        {
          fragment.appendChild(
            createElement("label", {}, [
              createElement("span", {}, [key]),
              createElement("input", {
                name,
                type: uiWidget === "range" ? "range" : "number",
                required,
                value: defaultValueString,
                min: String(value.minimum),
                max: String(value.maximum),
                step: value.type === "integer" ? "1" : "any",
              }),
            ]),
          );
        }
        break;
      case "boolean":
        {
          fragment.appendChild(
            createElement("label", {}, [
              createElement("span", {}, [key]),
              createElement("input", {
                name,
                type: "checkbox",
                required,
                checked: defaultValue as boolean | undefined,
                placeholder: description,
              }),
            ]),
          );
        }
        break;
      case "array":
        {
          if (typeof value.items !== "object" || Array.isArray(value.items)) {
            throw new Error(
              `Unsupported schema type for field "${name}", array items schema is invalid`,
            );
          }
          if (["object", "array"].includes(value.items.type!)) {
            throw new Error(
              `Unsupported schema type for field "${name}", array of ${value.items.type} is not supported`,
            );
          }

          const enumItems = value.items.enum;
          if (!enumItems) {
            throw new Error(
              `Unsupported schema type for field "${name}", array items must have enum`,
            );
          }

          // select[multiple]
          if (uiWidget === "select") {
            fragment.appendChild(
              createElement("label", {}, [
                createElement("span", {}, [key]),
                createElement(
                  "select",
                  {
                    name,
                    multiple: true,
                    required,
                  },
                  enumItems.map((optionValue) =>
                    createElement(
                      "option",
                      {
                        value: String(optionValue),
                        selected: defaultValue === optionValue,
                      },
                      [String(optionValue)],
                    ),
                  ),
                ),
              ]),
            );
          } else {
            // input[type=checkbox]
            fragment.appendChild(
              createElement("fieldset", {}, [
                createElement("legend", {}, [key]),
                ...enumItems.map((optionValue) =>
                  createElement("label", {}, [
                    createElement("input", {
                      type: "checkbox",
                      name,
                      value: String(optionValue),
                      required,
                      checked: defaultValue === optionValue,
                      placeholder: description,
                    }),
                    createElement("span", {}, [String(optionValue)]),
                  ]),
                ),
              ]),
            );
          }
        }
        break;
      case "object":
        {
          fragment.appendChild(
            createElement("fieldset", { name }, [
              createElement("legend", {}, [key]),
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
