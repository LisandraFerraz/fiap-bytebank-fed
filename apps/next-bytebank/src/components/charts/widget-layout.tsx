import styles from "./widget-layout.module.scss";
import React from "react";

export const WidgetLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.widget_layout}>{children}</div>;
};
