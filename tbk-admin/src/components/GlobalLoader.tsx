import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import Spinner from "./Spinner";

export default function GlobalLoader() {
    // useIsFetching & useIsMutating
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const isLoading = (isFetching > 0) || (isMutating > 0);

    if (!isLoading){
        return null;
    };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50">
      <Spinner size="lg" />
    </div>
  )
}
