import { unflatten } from "flat";

/**
 * Normalize FormData into a nested object.
 */
export function normalizeFormData(formData: FormData) {
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
