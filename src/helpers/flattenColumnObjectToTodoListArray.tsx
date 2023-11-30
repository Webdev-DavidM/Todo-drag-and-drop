import { Column } from "../types";

export const flattenColumnObjectToTodoListArray = (columnObject: any) => {
  console.log("column", columnObject);

  const flattenedTodoList: any = Object.keys(columnObject).reduce(
    (acc: any, key: any) => {
      const columnItems = columnObject[key].items;
      const columnItemsWithSourceColumn = columnItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        details: item.details,
        column: columnObject[key].name,
      }));
      return [...acc, ...columnItemsWithSourceColumn];
    },
    []
  );
  console.log("flattenedTodoList", flattenedTodoList);
  return flattenedTodoList;
};
