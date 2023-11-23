export type Todo = {
  id: string;
  title: string;
  details: string;
  column: string;
};

export type TodoList = Todo[] | [];
