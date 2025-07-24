import styles from "./paginator.module.scss";
import { useEffect, useState } from "react";
import { Pagination } from "../../utils/interfaces/pagination";
import { Icon } from "@components/icon/icon";

export const Paginator = ({
  totalItems,
  itemsPage,
  currentPage,
  nextPage,
}: Pagination) => {
  const [pagNumbers, setPagNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPage); i++) {
      numbers.push(i);
    }
    setPagNumbers(numbers);
  }, [totalItems, itemsPage]);

  return totalItems > itemsPage ? (
    <div className={styles.paginator_container}>
      <button
        className={styles.skip_btn}
        onClick={() => (totalItems > 1 ? nextPage!(currentPage - 1) : "")}
      >
        <Icon iconKey="chevLeft" />
      </button>
      {pagNumbers.map((page) => (
        <button
          key={page}
          onClick={() => nextPage!(page)}
          className={
            currentPage === page ? `${styles.active}` : `${styles.default}`
          }
        >
          {page}
        </button>
      ))}
      <button
        className={styles.skip_btn}
        onClick={() => (totalItems > 1 ? nextPage!(currentPage + 1) : "")}
      >
        <Icon iconKey="chevRight" />
      </button>
    </div>
  ) : (
    <></>
  );
};
