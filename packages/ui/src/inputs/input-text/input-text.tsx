import styles from "./input-text.module.scss";
import sharedStyles from "./../input-styles.module.scss";

import { IMaskInput } from "react-imask";

export const InputText = ({
  label,
  errorMsg,
  value,
  id,
  type,
  placeHolder,
  onChange,
  ref,
  mask,
  blocks,
}: {
  label: string;
  errorMsg?: string;
  value?: string | number | null;
  id: string;
  type?: string | "text";
  placeHolder: string;
  onChange?: (e: any) => void;
  ref?: any;
  mask?: string;
  blocks?: any;
}) => {
  return (
    <div className={`${styles.input_group} ${errorMsg ? styles.error : ""}`}>
      <label className={sharedStyles.label} htmlFor={id}>
        {label} {errorMsg}
      </label>
      {mask ? (
        <IMaskInput
          mask={mask}
          blocks={blocks}
          unmask={true}
          overwrite={true}
          autofix={true}
          className={sharedStyles.input}
          placeholder={placeHolder}
          onAccept={(value: string | number) =>
            onChange?.({ target: { value } })
          }
          type={type}
          id={id}
          ref={ref}
        />
      ) : (
        <input
          className={sharedStyles.input}
          placeholder={placeHolder}
          onChange={onChange}
          type={type}
          id={id}
          ref={ref}
        />
      )}
    </div>
  );
};
