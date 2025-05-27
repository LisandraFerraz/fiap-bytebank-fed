import "./../styles/global.scss";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "../styles/layout.module.scss";
import { UseUser } from "../utils/hooks/useUser";
import { useEffect, useState } from "react";
import { UserContext } from "../context/user-context";

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const { getUserInfo } = UseUser();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const data = await getUserInfo("12345678901");
    const parsedData = await data.json(); // -> trocar o cpf para outros perfis

    setUserData(parsedData.data[0]);
  }

  return (
    <UserContext.Provider value={{ user: userData }}>
      <div className={styles.custom_body}>
        <Sidenav />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </UserContext.Provider>
  );
}
