import { Column } from "../types";

export const flattenColumnObjectToTodoListArray = (column: Column[]) => {
  const flattenedTodoList: any = Object.keys(column).reduce(
    (acc: any, key: any) => {
      const columnItems = column[key].items;
      const columnItemsWithSourceColumn = columnItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        details: item.details,
        column: column[key].name,
      }));
      return [...acc, ...columnItemsWithSourceColumn];
    },
    []
  );
  return flattenedTodoList;
};
