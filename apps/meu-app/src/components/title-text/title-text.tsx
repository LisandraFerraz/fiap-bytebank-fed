import style from "./title-text.module.scss";

export const Title = ({ text }: { text: string }) => {
  return <p className={style.title}>{text}</p>;
};
