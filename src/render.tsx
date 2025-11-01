/**
 * We use hono/jsx, so all HTML attributes are in html standard (e.g., "class" instead of "className")
 */
import type { PropsWithChildren } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";
import type { z } from "zod";
// import { createElement } from "hono/jsx";

export interface ObjectSchema {
  type: "object";
  properties?: Record<string, any>;
  [key: string]: any;
}

// we use BaseSchema instead of ObjectSchema
// as z.toJSONSchema returns BaseSchema
type StrictObjectSchema = z.core.JSONSchema.BaseSchema;

export function convertSchemaToString(schema: ObjectSchema): string {
  return RenderSchemaToHonoElements({
    schema,
  }).toString();
}

export function convertSchemaToFormString(
  schema: ObjectSchema,
  props?: JSX.IntrinsicElements["form"]
): string {
  return RenderSchemaToHonoForm({
    schema,
    ...props,
  }).toString();
}

export function RenderSchemaToHonoForm({
  schema,
  children,
  ...props
}: PropsWithChildren<
  JSX.IntrinsicElements["form"] & {
    schema: ObjectSchema;
  }
>) {
  return (
    <form {...props}>
      <RenderSchemaToHonoElements schema={schema} />
      {children}
    </form>
  );
}

/**
 * Supported schema metadata fields:
 * - uiWidget: string - to specify the preferred UI widget type, e.g., "textarea", "select", "range", etc.
 * - uiName: string - to specify the display name of the field, otherwise the key name will be used.
 */
export function RenderSchemaToHonoElements({
  schema: _schema,
  parent,
  getID = (path) => path,
}: {
  schema: ObjectSchema;
  parent?: string;
  getID?: (path: string) => string;
}) {
  const schema = _schema as StrictObjectSchema;

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
        const displayName = value.uiName || key;
        const name = parent ? `${parent}.${key}` : key;

        if (value.type === "string") {
          if (value.enum) {
            // string with enum
            if (uiWidget === "select") {
              return (
                <div key={name}>
                  <label for={getID(name)} title={description}>
                    {displayName}
                  </label>
                  <select id={getID(name)} name={name} required={required}>
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
                </div>
              );
            } else {
              return (
                <div key={name}>
                  <span title={value.description}>{displayName}</span>
                  <span>
                    {value.enum.map((optionValue) => (
                      <label key={String(optionValue)}>
                        <input
                          type="radio"
                          name={name}
                          value={String(optionValue)}
                          required={required}
                          checked={defaultValue === optionValue}
                        />
                        <span>{String(optionValue)}</span>
                      </label>
                    ))}
                  </span>
                </div>
              );
            }
          } else if (
            value.format === "uri" ||
            value.format === "email" ||
            value.format === "date-time-local" ||
            value.format === "time-local"
          ) {
            const type = {
              uri: "url",
              email: "email",
              "date-time-local": "datetime-local",
              "time-local": "time",
            }[value.format];

            return (
              <div key={name}>
                <label for={getID(name)} title={value.description}>
                  {displayName}
                </label>
                <input
                  id={getID(name)}
                  name={name}
                  type={type}
                  required={required}
                  value={defaultValueString}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                />
              </div>
            );
          } else if (uiWidget === "textarea") {
            return (
              <div key={name}>
                <label for={getID(name)} title={description}>
                  {displayName}
                </label>
                <textarea
                  id={getID(name)}
                  name={name}
                  required={required}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                >
                  {defaultValueString}
                </textarea>
              </div>
            );
          } else {
            return (
              <div key={name}>
                <label for={getID(name)} title={description}>
                  {displayName}
                </label>
                <input
                  id={getID(name)}
                  name={name}
                  type="text"
                  required={required}
                  value={defaultValueString}
                  minlength={value.minLength}
                  maxlength={value.maxLength}
                  pattern={value.pattern}
                  title={value.pattern}
                />
              </div>
            );
          }
        } else if (value.type === "number" || value.type === "integer") {
          const step = {
            number: "any",
            integer: "1",
          }[value.type];

          return (
            <div key={name}>
              <label for={getID(name)} title={description}>
                {displayName}
              </label>
              <input
                id={getID(name)}
                name={name}
                type={uiWidget === "range" ? "range" : "number"}
                required={required}
                value={defaultValueString}
                min={value.minimum}
                max={value.maximum}
                step={step}
              />
            </div>
          );
        } else if (value.type === "boolean") {
          return (
            <div key={name}>
              <label for={getID(name)} title={description}>
                {displayName}
              </label>
              <input
                id={getID(name)}
                name={name}
                type="checkbox"
                required={required}
                checked={defaultValue as boolean | undefined}
              />
            </div>
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
              <div key={name}>
                <label for={getID(name)} title={description}>
                  {displayName}
                </label>
                <select
                  id={getID(name)}
                  name={name}
                  multiple
                  required={required}
                >
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
              </div>
            );
          } else {
            return (
              <div key={name}>
                <span title={description}>{displayName}</span>
                <span>
                  {enumItems.map((optionValue) => (
                    <label key={optionValue}>
                      <input
                        type="checkbox"
                        name={name}
                        value={String(optionValue)}
                        required={required}
                        checked={defaultValue === optionValue}
                      />
                      <span>{String(optionValue)}</span>
                    </label>
                  ))}
                </span>
              </div>
            );
          }
        } else if (value.type === "object") {
          return (
            <fieldset key={name} name={name}>
              <legend title={description}>{displayName}</legend>
              <div>
                <RenderSchemaToHonoElements
                  schema={value as ObjectSchema}
                  parent={name}
                  getID={getID}
                />
              </div>
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
