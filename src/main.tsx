import type { z } from "zod";

export function convertSchemaToString(
  schema: z.core.JSONSchema.BaseSchema
): string {
  return convertSchemaToJSXElement(schema).toString();
}

export function convertSchemaToJSXElement(
  schema: z.core.JSONSchema.BaseSchema,
  parent?: string
) {
  if (schema.type !== "object") {
    throw new Error("Root schema must be of type object");
  }
  if (!schema.properties) {
    throw new Error("Root schema must have properties");
  }
  const requiredKeys = new Set(schema.required);

  return (
    <>
      {Object.entries(schema.properties).map(([key, value]) => {
        if (typeof value === "boolean" || !value.type)
          throw new Error(
            `Unsupported schema type for field "${key}", missing type`
          );

        const { uiWidget, default: defaultValue, description } = value;
        const defaultValueString =
          defaultValue == undefined ? undefined : String(defaultValue);
        const required = requiredKeys.has(key);
        const name = parent ? `${parent}.${key}` : key;

        if (value.type === "string") {
          if (value.enum) {
            // string with enum
            if (uiWidget === "select") {
              return (
                <label key={name}>
                  <span>{key}</span>
                  <select name={name} required={required}>
                    {value.enum.map((optionValue) => (
                      <option
                        key={optionValue}
                        value={String(optionValue)}
                        selected={defaultValue === optionValue}
                      >
                        {String(optionValue)}
                      </option>
                    ))}
                  </select>
                </label>
              );
            } else {
              return (
                <fieldset key={name}>
                  <legend>{key}</legend>
                  {value.enum.map((optionValue) => (
                    <label key={String(optionValue)}>
                      <input
                        type="radio"
                        name={name}
                        value={String(optionValue)}
                        required={required}
                        checked={defaultValue === optionValue}
                        placeholder={description}
                      />
                      <span>{String(optionValue)}</span>
                    </label>
                  ))}
                </fieldset>
              );
            }
          } else if (value.format === "uri") {
            return (
              <label key={name}>
                <span>{key}</span>
                <input
                  name={name}
                  type="url"
                  required={required}
                  value={defaultValueString}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                  placeholder={description}
                />
              </label>
            );
          } else if (uiWidget === "textarea") {
            return (
              <label key={name}>
                <span>{key}</span>
                <textarea
                  name={name}
                  required={required}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                  placeholder={description}
                >
                  {defaultValueString}
                </textarea>
              </label>
            );
          } else {
            return (
              <label key={name}>
                <span>{key}</span>
                <input
                  name={name}
                  type="text"
                  required={required}
                  value={defaultValueString}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                  pattern={value.pattern}
                  placeholder={description}
                />
              </label>
            );
          }
        } else if (value.type === "number") {
          return (
            <label key={name}>
              <span>{key}</span>
              <input
                name={name}
                type={uiWidget === "range" ? "range" : "number"}
                required={required}
                value={defaultValueString}
                min={value.minimum}
                max={value.maximum}
                step="any"
              />
            </label>
          );
        } else if (value.type === "integer") {
          return (
            <label key={name}>
              <span>{key}</span>
              <input
                name={name}
                type={uiWidget === "range" ? "range" : "number"}
                required={required}
                value={defaultValueString}
                min={value.minimum}
                max={value.maximum}
                step="1"
              />
            </label>
          );
        } else if (value.type === "boolean") {
          return (
            <label key={name}>
              <span>{key}</span>
              <input
                name={name}
                type="checkbox"
                required={required}
                checked={defaultValue as boolean | undefined}
                placeholder={description}
              />
            </label>
          );
        } else if (value.type === "array") {
          if (typeof value.items !== "object" || Array.isArray(value.items)) {
            throw new Error(
              `Unsupported schema type for field "${name}", array items schema is invalid`
            );
          }
          if (["object", "array"].includes(value.items.type!)) {
            throw new Error(
              `Unsupported schema type for field "${name}", array of ${value.items.type} is not supported`
            );
          }

          const enumItems = value.items.enum;
          if (!enumItems) {
            throw new Error(
              `Unsupported schema type for field "${name}", array items must have enum`
            );
          }

          if (uiWidget === "select") {
            return (
              <label key={name}>
                <span>{key}</span>
                <select name={name} multiple required={required}>
                  {enumItems.map((optionValue) => (
                    <option
                      key={optionValue}
                      value={String(optionValue)}
                      selected={defaultValue === optionValue}
                    >
                      {String(optionValue)}
                    </option>
                  ))}
                </select>
              </label>
            );
          } else {
            return (
              <fieldset key={name}>
                <legend>{key}</legend>
                {enumItems.map((optionValue) => (
                  <label key={optionValue}>
                    <input
                      type="checkbox"
                      name={name}
                      value={String(optionValue)}
                      required={required}
                      checked={defaultValue === optionValue}
                      placeholder={description}
                    />
                    <span>{String(optionValue)}</span>
                  </label>
                ))}
              </fieldset>
            );
          }
        } else if (value.type === "object") {
          return (
            <fieldset key={name} name={name}>
              <legend>{key}</legend>
              {convertSchemaToJSXElement(value, name)}
            </fieldset>
          );
        } else {
          throw new Error(
            `Unsupported schema type for field "${name}", got "${value.type}"`
          );
        }
      })}
    </>
  );
}
