import { useEffect, useRef, useState } from "react";
import styles from "./tabs-list.module.scss";

interface ITabs {
  title: string;
  component: React.ReactNode;
}

export const TabsList = ({ data }: { data: ITabs[] }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  return (
    // <div className={styles.tabs_container}>
    <>
      <div className={styles.tab}>
        {data.map((item: any, index: any) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.tab_content}>
        {data.map((item: any, index: any) => (
          <div className={`${selectedTab === index ? "" : styles.hidden}`}>
            {item.component}
          </div>
        ))}
      </div>
    </>
    // </div>
  );
};
