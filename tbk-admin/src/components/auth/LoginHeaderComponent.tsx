import { motion } from 'framer-motion';

export default function LoginHeaderComponent() {
    return (
        <div className="flex flex-col space-y-3 text-center">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent"
            >
                Welcome Back
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-muted-foreground"
            >
                Enter your credentials to access your account.
            </motion.p>
        </div>
    );
}