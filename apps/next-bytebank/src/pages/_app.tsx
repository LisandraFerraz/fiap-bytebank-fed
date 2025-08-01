import "@bytebank/ui/variables";
import styles from "../styles/layout.module.scss";
import "./../styles/global.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";

import { Sidenav } from "@components/sidenav/sidenav";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@bytebank/ui";
import {
  LoaderContext,
  LoaderProvider,
} from "../utils/contexts/loading-context";
import { ToastProvider } from "../utils/contexts/toast-context";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
  }, [router.asPath]);

  const routesWOSidebar = ["/auth", "/home"];

  return (
    <LoaderProvider>
      <ToastProvider>
        {!routesWOSidebar.some((route) => router.route.startsWith(route)) ? (
          <>
            <div className={styles.custom_body}>
              <>
                <div className={`${!isVisible ? styles.hidden : ""}`}>
                  <Sidenav />
                </div>
                <button
                  className={styles.toggle_sidenav}
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Icon iconKey="menu" />
                </button>
              </>
              <div className={styles.content}>
                <Component {...pageProps} />
              </div>
            </div>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ToastProvider>
    </LoaderProvider>
  );
}
