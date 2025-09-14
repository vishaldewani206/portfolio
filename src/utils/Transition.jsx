// Transition.jsx
import React from "react";
import { motion } from "framer-motion";

const Transition = (Component) => {
  const Wrapped = (props) => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0,  },
        animate: { opacity: 1, },
        exit: { opacity: 0 },
      }}
      transition={{ duration: 0.25 }}
      style={{ position: "relative" }}
      className="slide-in"
    >
      <Component {...props} />

      {/* single full-screen overlay */}
      {/* <motion.div
        className="slide-out"
        variants={{
          initial: { scaleY: 1 },
          animate: { scaleY: 0 },
          exit: { scaleY: 1 },
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top", pointerEvents: "none" }}
      /> */}
    </motion.div>
  );

  Wrapped.displayName = `Transition(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default Transition;
