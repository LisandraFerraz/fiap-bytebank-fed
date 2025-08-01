import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader_bg}>
      <span className={styles.loader}></span>
    </div>
  );
}
