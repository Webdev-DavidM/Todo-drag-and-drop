import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import data from "../todos.json";
import { enqueueSnackbar } from "notistack";
import { get } from "http";

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
  deleteId: string;
};

// type UpdatedTodo = {
//   id: number;
//   title: string;
//   completed: boolean;
// };

export const getAllToDo: any = createAsyncThunk<any>(
  "toDoList/getAllToDo",
  async (_, { dispatch, getState }) => {
    try {
      const allTodos = await axios.get("http://localhost:5000/todos");
      return allTodos;
    } catch {
      console.error("err");
    }
  }
);

export const createToDo: any = createAsyncThunk<any>(
  "toDoList/createToDo",
  async (todo: any, { dispatch, getState }) => {
    try {
      const updatedTodos = await axios.post("http://localhost:5000/todos", {
        todo,
      });
      return updatedTodos;
    } catch {
      console.error("err");
    }
  }
);

export const deleteToDo: any = createAsyncThunk<any>(
  "toDoList/deleteToDo",
  async (deleteId: any, { dispatch, getState }) => {
    try {
      const newTodo = await axios.delete("http://localhost:5000/todos", {
        data: { id: deleteId },
      });
      return newTodo;
    } catch {
      console.error("err");
    }
  }
);

export const updateToDo = createAsyncThunk(
  "toDoList/updateToDo",
  async (updatedTodo: {}, { dispatch, getState }) => {
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
    toDoList: [],
    loading: false,
    authenticated: true,
    showTodoModal: false,
    showDeleteModal: false,
    deleteId: "",
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
    setDeleteId: (state, action: PayloadAction<string>) => {
      state.deleteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllToDo
    builder
      .addCase(getAllToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllToDo.fulfilled, (state, action) => {
        state.loading = false;

        const allToDos = action.payload.data;
        console.log("allToDos", allToDos);
        state.toDoList = allToDos;
      })
      .addCase(getAllToDo.rejected, (state, action) => {
        // const { requestId } = action.meta;
        // if (
        //   state.loading === 'pending' &&
        //   state.currentRequestId === requestId
        // ) {
        //   state.loading = 'idle'
        //   state.error = action.error
        //   state.currentRequestId = undefined
        // }
      });
    // deleteToDo
    builder
      .addCase(deleteToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteToDo.fulfilled, (state, action) => {
        state.loading = false;

        const allToDos = action.payload.data;
        console.log("allToDos", allToDos);
        state.toDoList = allToDos;
      })
      .addCase(deleteToDo.rejected, (state, action) => {
        // const { requestId } = action.meta;
        // if (
        //   state.loading === 'pending' &&
        //   state.currentRequestId === requestId
        // ) {
        //   state.loading = 'idle'
        //   state.error = action.error
        //   state.currentRequestId = undefined
        // }
      });
    // createToDo
    builder
      .addCase(createToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createToDo.fulfilled, (state, action) => {
        state.loading = false;

        const allToDos = action.payload.data;
        console.log("allToDos", allToDos);
        state.toDoList = allToDos;
      })
      .addCase(createToDo.rejected, (state, action) => {
        // const { requestId } = action.meta;
        // if (
        //   state.loading === 'pending' &&
        //   state.currentRequestId === requestId
        // ) {
        //   state.loading = 'idle'
        //   state.error = action.error
        //   state.currentRequestId = undefined
        // }
      });
  },
});

export const { setLoading, setShowTodoModal, setShowDeleteModal, setDeleteId } =
  toDoListSlice.actions;

export default toDoListSlice.reducer;
