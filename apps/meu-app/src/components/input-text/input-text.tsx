import styles from "./input-text.module.scss";

export const InputText = ({
  label,
  value,
  id,
  type,
  placeHolder,
  onChange,
}: {
  label: string;
  value: string | number;
  id: string;
  type?: "text";
  placeHolder: string;
  onChange?: (e: any) => void;
}) => {
  return (
    <div className={styles.input_group}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        value={value}
        id={id}
      />
    </div>
  );
};
