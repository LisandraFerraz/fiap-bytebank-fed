import "./../styles/global.scss";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "../styles/layout.module.scss";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <div className={styles.custom_body}>
      <Sidenav />
      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
