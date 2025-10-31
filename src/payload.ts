import { unflatten } from "flat";

/**
 * Normalize FormData into a nested object.
 * Please note that File cannot represented in JSON, so json schema validation may fail for file fields.
 */
export function normalizeFormData(formData: FormData): Record<string, any> {
  const record: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const [key, value] of formData) {
    if (key in record) {
      if (Array.isArray(record[key])) {
        (record[key] as FormDataEntryValue[]).push(value);
      } else {
        record[key] = [record[key], value];
      }
    } else {
      record[key] = value;
    }
  }

  return unflatten(record);
}
