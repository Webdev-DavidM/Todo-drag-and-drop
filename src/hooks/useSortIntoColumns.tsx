import { useEffect, useState } from "react";
import { Todo } from "../types";
import { Columns } from "../enums";

type ColumnType = {
  [key: string]: {
    name: string;
    details: string;
    items: Todo[];
  };
};

export const useSortItemsIntoColumns = (items: Todo[]) => {
  const [sortedColumns, setSortedColumns] = useState<ColumnType>({
    toDo: {
      name: Columns.TO_DO,
      details: "",
      items: [],
    },
    inProgress: {
      name: Columns.IN_PROGRESS,
      details: "",
      items: [],
    },
    done: {
      name: Columns.DONE,
      details: "",
      items: [],
    },
  });

  useEffect(() => {
    const toDo = items.filter((item) => item.column === Columns.TO_DO);
    const inProgress = items.filter(
      (item) => item.column === Columns.IN_PROGRESS
    );
    const done = items.filter((item) => item.column === Columns.DONE);
    setSortedColumns({
      toDo: {
        name: Columns.TO_DO,
        details: "",
        items: toDo,
      },
      inProgress: {
        name: Columns.IN_PROGRESS,
        details: "",
        items: inProgress,
      },
      done: {
        name: Columns.DONE,
        details: "",
        items: done,
      },
    });
  }, [items]);

  console.log("sortedColumns", sortedColumns);

  return { sortedColumns };
};
