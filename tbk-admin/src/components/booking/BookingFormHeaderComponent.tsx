import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

export default function BookingFormHeaderComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-start sm:items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-primary shadow-soft shrink-0">
          <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">New Villa Booking</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 shrink-0 hidden xs:block" />
            <p className="text-sm sm:text-base">Create a new booking for your Goa villa properties.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}