import { useEffect, useState } from "react";
import { Todo } from "../types";
import { Columns } from "../enums";
import { useSelector } from "react-redux";

type ColumnType = {
  [key: string]: {
    name: string;
    items: Todo[];
  };
};

export const useSortItemsIntoColumns = (setColumns: any) => {
  const toDos = useSelector((state: any) => state.toDoList.toDoList);
  // const [sortedColumns, setSortedColumns] = useState<ColumnType>({
  //   toDo: {
  //     name: Columns.TO_DO,
  //     items: [],
  //   },
  //   inProgress: {
  //     name: Columns.IN_PROGRESS,
  //     items: [],
  //   },
  //   done: {
  //     name: Columns.DONE,
  //     items: [],
  //   },
  // });

  useEffect(() => {
    const toDo = toDos.filter((todo: Todo) => todo.column === Columns.TO_DO);
    const inProgress = toDos.filter(
      (todo: Todo) => todo.column === Columns.IN_PROGRESS
    );
    const done = toDos.filter((todo: Todo) => todo.column === Columns.DONE);
    setColumns({
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
  }, [toDos, setColumns]);

  // return { sortedColumns };
};
