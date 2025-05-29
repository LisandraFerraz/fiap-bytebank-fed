import "./../styles/global.scss";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "../styles/layout.module.scss";
import { UseUser } from "../utils/hooks/useUser";
import { useEffect, useState } from "react";
import { UserContext } from "../context/user-context";
import { useRouter } from "next/router";

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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [router.asPath]);

  async function getUserData() {
    const mockedCpf = "12345678901";
    const data = await getUserInfo(mockedCpf); // -> trocar o cpf para outros perfis
    const parsedData = await data.json();

    setUserData(parsedData.data[0]);
  }

  return (
    <UserContext.Provider value={{ user: userData }}>
      <div className={styles.custom_body}>
        <div className={`${!isVisible ? styles.hidden : ""}`}>
          <Sidenav />
        </div>
        <button
          className={styles.toggle_sidenav}
          onClick={() => setIsVisible(!isVisible)}
        >
          O
        </button>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </UserContext.Provider>
  );
}
