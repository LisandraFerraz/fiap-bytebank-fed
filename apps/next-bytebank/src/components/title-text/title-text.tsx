import styles from "./title-text.module.scss";

enum TitleSizes {
  lg = "lg",
  md = "md",
  base = "base",
  sm = "sm",
}

type titleSize = keyof typeof TitleSizes;

export const Title = ({ text, size }: { text: string; size: titleSize }) => {
  return <p className={`${styles.title} ${styles[size]}`}>{text}</p>;
};
