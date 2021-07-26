import { useDataSource } from "../components/data-source/use-data-source";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const useHandleNoDatasource = () => {
  const {
    value: { url },
  } = useDataSource();
  const router = useRouter();
  useEffect(
    () => (!url ? router.push("/") : undefined) && undefined,
    [url, router]
  );
};
