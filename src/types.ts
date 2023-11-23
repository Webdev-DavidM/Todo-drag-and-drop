export type Todo = {
  id: number;
  title: string;
  details: string;
  column: string;
};

export type TodoList = Todo[] | [];
