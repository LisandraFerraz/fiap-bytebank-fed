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
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <span>{modalTitle}</span>
          <button onClick={onClose}>
            <Icon iconKey="close" />
          </button>
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};
