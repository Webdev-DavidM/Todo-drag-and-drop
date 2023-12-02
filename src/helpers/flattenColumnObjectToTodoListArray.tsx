import { ColumnsObject, Todo } from "../types";

export const flattenColumnObjectToTodoListArray = (
  columnObject: ColumnsObject
) => {
  const flattenedTodoList: Todo[] = Object.keys(columnObject).reduce(
    (acc: Todo[] | [], key: string) => {
      const columnItems = columnObject[key].items;
      const columnItemsWithSourceColumn = columnItems.map((item: Todo) => ({
        id: item.id,
        title: item.title,
        details: item.details,
        column: columnObject[key].name,
      }));
      return [...acc, ...columnItemsWithSourceColumn];
    },
    []
  );
  return flattenedTodoList;
};
