import { useEffect, useState } from "react";
import { Todo } from "../types";
import { Columns } from "../enums";

type ColumnType = {
  [key: string]: {
    name: string;
    items: Todo[];
  };
};

export const useSortItemsIntoColumns = (items: Todo[]) => {
  const [sortedColumns, setSortedColumns] = useState<ColumnType>({
    toDo: {
      name: Columns.TO_DO,

      items: [],
    },
    inProgress: {
      name: Columns.IN_PROGRESS,

      items: [],
    },
    done: {
      name: Columns.DONE,

      items: [],
    },
  });

  useEffect(() => {
    console.log("items", items);
    const toDo = items.filter((item) => item.column === Columns.TO_DO);
    const inProgress = items.filter(
      (item) => item.column === Columns.IN_PROGRESS
    );
    const done = items.filter((item) => item.column === Columns.DONE);
    setSortedColumns({
      toDo: {
        name: Columns.TO_DO,

        items: toDo,
      },
      inProgress: {
        name: Columns.IN_PROGRESS,

        items: inProgress,
      },
      done: {
        name: Columns.DONE,

        items: done,
      },
    });
  }, [items]);

  console.log("sortedColumns", sortedColumns);

  return { sortedColumns };
};
