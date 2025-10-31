/**
 * We do not bundle this module, because we do not want to depend on (or bundle) Ajv. (it's large!)
 * To use this util we can just do copy-paste.
 */
import { Ajv } from "ajv";

export function validateJSON<T extends { type: "object" }>(
  schema: T,
  input: Record<string, any>
) {
  const validate = new Ajv({
    coerceTypes: "array",
    strictSchema: false,
  }).compile(schema);

  const output = JSON.parse(JSON.stringify(input));
  const valid = validate(output);

  return {
    valid,
    errors: validate.errors,
    output,
  };
}

import { normalizeFormData } from "./payload.ts";
export function validateFormData<T extends { type: "object" }>(
  schema: T,
  formData: FormData
) {
  const data = normalizeFormData(formData);
  return validateJSON(schema, data);
}
