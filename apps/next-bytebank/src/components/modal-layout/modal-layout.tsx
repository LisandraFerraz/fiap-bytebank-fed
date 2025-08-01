import { Icon } from "@bytebank/ui";
import styles from "./modal-layout.module.scss";
import { motion } from "framer-motion";

export const ModalLayout = ({
  modalTitle,
  children,
  onClose,
}: {
  modalTitle: string;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const handleCloseModal = (e: any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div className={styles.modal_background}>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <span>{modalTitle}</span>
              <button className={styles.close_btn} onClick={handleCloseModal}>
                <Icon iconKey="close" />
              </button>
            </div>
            <div className={styles.modal_body}>{children}</div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
