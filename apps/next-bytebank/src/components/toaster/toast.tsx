import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { toastTypes } from "../../utils/types";
import styles from "./toast.module.scss";
import { motion } from "framer-motion";

export default function Toast({
  message,
  type,
}: {
  type: toastTypes;
  message: string;
}) {
  const { hideTost } = useToast();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          ease: "easeOut",
          duration: 0.15,
        },
      }}
      onClick={() => hideTost()}
    >
      <div className={`${styles[type]} ${styles.toast}`}>
        <p>{message}</p>
      </div>
    </motion.div>
  );
}
