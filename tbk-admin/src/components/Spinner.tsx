import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

function Spinner({ size = "md" }) {
    const sizeClass = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    }[size];
    
  return (
    <LoaderCircle
      className={cn(
        "animate-spin text-red-800",
        sizeClass
      )}
    />
  );
}

export default Spinner;
