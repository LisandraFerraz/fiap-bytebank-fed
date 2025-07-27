import styles from "./title.module.scss";

type TitleSize = "lg" | "md" | "base" | "sm";

export const Title = ({ text, size }: { text: string; size: TitleSize }) => {
  return (
    <>
      <p className={`${styles.title} ${styles[size]}`}>{text}</p>
    </>
  );
};
