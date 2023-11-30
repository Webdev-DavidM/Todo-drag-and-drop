import { useEffect } from "react";
import { useSelector } from "react-redux";

// Enums
import { COLUMN } from "../enums";

// Types
import { Todo } from "../types";

export const useSortItemsIntoColumns = (setColumns: any) => {
  const toDos = useSelector((state: any) => state.toDoList.toDoList);

  useEffect(() => {
    const toDo = toDos.filter((todo: Todo) => todo.column === COLUMN.TO_DO);
    const inProgress = toDos.filter(
      (todo: Todo) => todo.column === COLUMN.IN_PROGRESS
    );
    const done = toDos.filter((todo: Todo) => todo.column === COLUMN.DONE);
    setColumns({
      toDo: {
        name: COLUMN.TO_DO,
        items: toDo,
      },
      inProgress: {
        name: COLUMN.IN_PROGRESS,
        items: inProgress,
      },
      done: {
        name: COLUMN.DONE,
        items: done,
      },
    });
  }, [toDos, setColumns]);
};
