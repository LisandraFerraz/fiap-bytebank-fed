import { Icon } from "@components/icon/icon";
import styles from "./modal-layout.module.scss";

export const ModalLayout = ({
  modalTitle,
  children,
}: {
  modalTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <span>{modalTitle}</span>
          <Icon iconKey="close" />
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};
