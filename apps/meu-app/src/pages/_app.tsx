import "../core/lib/axiosInstance";
import "./../styles/global.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "../styles/layout.module.scss";
import { UseUser } from "../utils/hooks/useUser";
import { useEffect, useState } from "react";
import { UserContext } from "../context/user-context";
import { useRouter } from "next/router";
import { Icon } from "@components/icon/icon";
import { GetServerSidePropsContext } from "next";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const { getUserInfo } = UseUser();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [router.asPath]);

  async function getUserData() {
    const userLogin = {
      email: "anaclara@email.com",
      password: "anaclara123",
    };

    // const data = await getUserInfo(userLogin);
    // const parsed = await data.json();

    // setAccountData(parsed.account);
    // setUserData(parsed.user);
    // setToken(parsed.access_token);
  }

  const routesWOSidebar = ["/auth", "/home"];

  return (
    <>
      <UserContext.Provider
        value={{ user: userData, account: accountData, access_token: token }}
      >
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
      </UserContext.Provider>
    </>
  );
}
