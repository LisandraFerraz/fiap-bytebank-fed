import sharedStyles from "./../input-styles.module.scss";
import styles from "./input-select.module.scss";

export const Select = ({
  value,
  data,
  label,
  defaultSelected,
  onChange,
}: {
  value: string | "";
  data: any;
  label?: string;
  defaultSelected: string;
  onChange: (e: any) => void;
}) => {
  return (
    <div className={`${sharedStyles.input_group} ${styles.input_group}`}>
      {label && <label className={sharedStyles.label}>{label}</label>}
      <select
        value={value}
        defaultValue=""
        onChange={onChange}
        className={sharedStyles.input}
      >
        <option value="" disabled>
          {defaultSelected}
        </option>
        {data.map((item: any, idx: any) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
