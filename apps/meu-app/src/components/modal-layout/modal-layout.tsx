import { Icon } from "@components/icon/icon";
import styles from "./modal-layout.module.scss";

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
    <div className={styles.modal_background}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <span>{modalTitle}</span>
          <button className={styles.close_btn} onClick={handleCloseModal}>
            <Icon iconKey="close" />
          </button>
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};
