import type { AxiosError } from "axios";

export type ApiError = {
  message?: string;
  errors?: { message?: string[] | string };
};

export function isAxiosError<T = unknown>(e: unknown): e is AxiosError<T> {
  return (
    typeof e === "object" &&
    e !== null &&
    "isAxiosError" in e &&
    (e as { isAxiosError?: boolean }).isAxiosError === true
  );
}

export function extractApiMessage(err: AxiosError<ApiError> | unknown): string {
  if (isAxiosError<ApiError>(err)) {
    const data = err.response?.data;
    const firstFromArray = Array.isArray(data?.errors?.message)
      ? data.errors.message[0]
      : undefined;

    return (
      data?.message ??
      firstFromArray ??
      (typeof data?.errors?.message === "string"
        ? data?.errors?.message
        : undefined) ??
      "Une erreur est survenue."
    );
  }
  return "Une erreur est survenue.";
}
