import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import data from "../todos.json";
import { enqueueSnackbar } from "notistack";

type Todo = {
  id: string;
  title: string;
  details: string;
  column: string;
};

type InitialState = {
  loading: boolean;
  toDoList: Todo[] | [];
  authenticated: boolean;
  showTodoModal: boolean;
  showDeleteModal: boolean;
  toDoModalColumn: string;
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
export const signUp = createAsyncThunk(
  "toDoList/signUp",
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
export const signIn = createAsyncThunk(
  "toDoList/signIn",
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
    toDoList: data.todos,
    loading: false,
    authenticated: false,
    showTodoModal: false,
    showDeleteModal: false,
    toDoModalColumn: "",
  } as InitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowTodoModal: (
      state,
      action: PayloadAction<{
        showTodoModal: boolean;
        column: string;
      }>
    ) => {
      const { column, showTodoModal } = action.payload;
      state.showTodoModal = showTodoModal;
      state.toDoModalColumn = column;
      // state.showTodoModal = action.payload.showTodoModal;
    },
    setShowDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteModal = action.payload;

      // state.showTodoModal = action.payload.showTodoModal;
      enqueueSnackbar("Questions reordered successfully.", {
        variant: "success",
      });
    },
  },
});

export const { setLoading, setShowTodoModal, setShowDeleteModal } =
  toDoListSlice.actions;

export default toDoListSlice.reducer;
