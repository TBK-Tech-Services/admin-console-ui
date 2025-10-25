import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import BrandedLoader from "./BrandedLoader";

export default function GlobalLoader() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const isLoading = (isFetching > 0) || (isMutating > 0);

    if (!isLoading){
      return null;
    };

    return <BrandedLoader />;
}