import { updateToDoStatus } from "../redux/toDoListReducer";
import { useDispatch } from "react-redux";

// helpers
import { flattenColumnObjectToTodoListArray } from "../helpers/flattenColumnObjectToTodoListArray";
import { ColumnsObject } from "../types";

export const useOnDragEnd = () => {
  const dispatch = useDispatch();
  const onDragEnd = (
    result: any,
    columns: ColumnsObject,
    setColumns: (columns: ColumnsObject) => void
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const columnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      setColumns(columnsUpdated);
      const flattenedTodoList =
        flattenColumnObjectToTodoListArray(columnsUpdated);

      dispatch(updateToDoStatus(flattenedTodoList));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const columnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      setColumns(columnsUpdated);
      const flattenedTodoList =
        flattenColumnObjectToTodoListArray(columnsUpdated);
      dispatch(updateToDoStatus(flattenedTodoList));
    }
  };

  return { onDragEnd };
};
