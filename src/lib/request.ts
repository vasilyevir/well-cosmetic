interface RequestProps<T> {
  onSuccess: () => Promise<T>;
  onError?: (e: any) => void | { message: string };
}

export type ResultRequestType<T> = {
  data: T;
};

export const RequestNeon = async <T>({ onError, onSuccess }: RequestProps<T>) => {
  try {
    return { data: await onSuccess() };
  } catch (e) {
    if (onError) {
      const error = onError(e);

      if (error) {
        throw new Error(error.message);
      }
    }

    throw new Error("Произошла какая-то ошибка, попробуйте позже");
  }
};
