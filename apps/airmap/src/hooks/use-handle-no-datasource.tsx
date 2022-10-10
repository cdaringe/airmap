import { useDataSource } from "../components/data-source/use-data-source";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const useHandleNoDatasource = () => {
  const {
    value: { urls },
  } = useDataSource();
  const router = useRouter();
  useEffect(
    () =>
      (!urls.length || urls.some((url) => !url)
        ? router.push("/")
        : undefined) && undefined,
    [urls, router]
  );
};
