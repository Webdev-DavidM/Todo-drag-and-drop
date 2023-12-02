import { useEffect } from "react";
import { useSelector } from "react-redux";

// Enums
import { COLUMN } from "../enums";

// Types
import { ColumnsObject, Todo } from "../types";
import { RootState } from "../redux/store";

export const useSortItemsIntoColumns = (
  setColumns: (columns: ColumnsObject) => void
) => {
  const toDos = useSelector((state: RootState) => state.toDoList.toDoList);

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
