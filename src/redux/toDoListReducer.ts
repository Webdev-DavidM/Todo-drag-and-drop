import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import data from "../todos.json";

type Todo = {
  id: string;
  title: string;
  details: string;
  column: string;
};

type InitialState = {
  loading: boolean;
  toDoList: Todo[] | [];
};

// type UpdatedTodo = {
//   id: number;
//   title: string;
//   completed: boolean;
// };

console.log("todos", data.todos);

export const updateToDo = createAsyncThunk(
  "toDoList/updateToDo",
  async (updatedTodo, { dispatch, getState }) => {
    // const state: InitialState[] | [] = getState();
  }

  //   console.log("place", place);
  //   try {
  //     const topFive = await axios.post("http://localhost:4000/topFivePlaces", {
  //       place: `${place}`,
  //     });
  //     console.log("topFive", topFive);

  //     return topFive;
  //   } catch {
  //     console.error("err");
  //   }
  // }
);

export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState: {
    loading: false,
    toDoList: data.todos,
  } as InitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = toDoListSlice.actions;

export default toDoListSlice.reducer;
