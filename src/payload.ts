import { unflatten } from "flat";

/**
 * Normalize a FormData object into a nested JSON-like structure.
 *
 * - Repeated keys are aggregated into arrays (preserving order).
 * - Dotted paths like `user.name` are unflattened into `{ user: { name } }`.
 * - File/FileList cannot be represented in JSON; downstream JSON Schema validation
 *   may not work for file inputs without custom handling.
 *
 * @param formData The FormData instance to normalize.
 * @returns A plain object with nested structure derived from the form field names.
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
