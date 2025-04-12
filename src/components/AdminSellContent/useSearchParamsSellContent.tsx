import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useSearchParamsSellContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchValues = useMemo(() => {
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const date_from = searchParams.get("date_from");
    const date_to = searchParams.get("date_to");
    const status = searchParams.get("status");

    return {
      limit,
      offset,
      status,
      date_to,
      date_from,
    };
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return {
    pathname,
    searchParams,
    searchValues,
    createQueryString,
  };
};
