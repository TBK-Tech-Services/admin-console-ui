import { motion } from 'framer-motion';

export default function HeroSectionComponent() {
    return (
        <div className="relative hidden w-1/2 flex-col justify-center bg-gradient-sunset p-10 text-white lg:flex overflow-hidden">
            <motion.div
                className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className="z-20 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-center gap-4"
                >
                    <motion.img
                        src="/logo.svg"
                        alt="TBK Villas Logo"
                        className="h-16 w-16 drop-shadow-2xl"
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg">
                            TBK Villas
                        </h1>
                        <motion.div
                            className="h-1 bg-white/60 rounded-full mt-2"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="text-xl opacity-90 leading-relaxed max-w-md">
                        Manage your villa properties and track their performance effortlessly.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex gap-8 pt-4"
                >
                    <div className="space-y-1">
                        <div className="text-3xl font-bold">50+</div>
                        <div className="text-sm opacity-80">Villas</div>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div className="space-y-1">
                        <div className="text-3xl font-bold">1000+</div>
                        <div className="text-sm opacity-80">Bookings</div>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div className="space-y-1">
                        <div className="text-3xl font-bold">24/7</div>
                        <div className="text-sm opacity-80">Support</div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-glow/20" />
        </div>
    );
}