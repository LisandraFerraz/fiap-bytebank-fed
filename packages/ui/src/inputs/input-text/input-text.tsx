import styles from "./input-text.module.scss";
import sharedStyles from "./../input-styles.module.scss";

export const InputText = ({
  label,
  value,
  id,
  type,
  placeHolder,
  onChange,
  ref,
}: {
  label: string;
  value?: string | number;
  id: string;
  type?: string | "text";
  placeHolder: string;
  onChange?: (e: any) => void;
  ref?: any;
}) => {
  return (
    <div className={styles.input_group}>
      <label className={sharedStyles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={sharedStyles.input}
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        ref={ref}
      />
    </div>
  );
};
