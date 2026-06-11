import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PageTransitionLoader({ children }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="
            w-14
            h-14
            border-4
            border-blue-600
            border-t-transparent
            rounded-full
          "
        />

      </div>
    );
  }

  return children;
}