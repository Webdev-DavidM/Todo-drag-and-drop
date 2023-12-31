export type Todo = {
  id: string;
  title: string;
  details: string;
  column: string;
};

export type TodoList = Todo[] | [];

export type Column = {
  name: string;
  items: Todo[] | [];
};

export type ColumnsObject = {
  [key: string]: Column;
};
