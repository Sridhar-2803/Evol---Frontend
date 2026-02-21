// src/library/date.ts
import { format, parseISO } from "date-fns";

export const formatShowTime = (value: string | null | undefined): string => {
  if (!value) return "";

  // parse ISO string safely
  const date = parseISO(value); // works for: 2025-11-24T08:00:00, 2025-11-24T08:00:00Z, etc.

  if (isNaN(date.getTime())) {
    return value;
  }

  return format(date, "dd/MM/yyyy - h a");
};
