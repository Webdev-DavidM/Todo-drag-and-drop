import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

// type
import { Todo } from "../types";

export type InitialState = {
  loading: boolean;
  toDoList: Todo[] | [];
  authenticated: boolean;
  showTodoModal: boolean;
  showDeleteModal: boolean;
  toDoModalColumn: string;
  deleteId: string;
};

export const getAllToDo = createAsyncThunk(
  "toDoList/getAllToDo",
  async (_, { dispatch, getState }) => {
    try {
      const allTodos = await axios.get(
        "https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/todos"
      );
      enqueueSnackbar("Todo list loaded successfully", {
        variant: "success",
      });
      return allTodos;
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Could not get your todo list", {
        variant: "error",
      });
    }
  }
);

export const createToDo = createAsyncThunk(
  "toDoList/createToDo",
  async (todo: Todo, { dispatch, getState }) => {
    try {
      const updatedTodos = await axios.post(
        "https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/todos",
        {
          todo,
        }
      );
      return updatedTodos;
    } catch {
      console.error("err");
    }
  }
);

export const updateToDoStatus = createAsyncThunk(
  "toDoList/updateToDoStatus",
  async (todos: Todo[], { dispatch, getState }) => {
    try {
      const updatedTodos = await axios.put(
        "https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/todos/updateColumns",
        {
          todos,
        }
      );
      return updatedTodos;
    } catch {
      console.error("err");
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "toDoList/deleteToDo",
  async (deleteId: string, { dispatch, getState }) => {
    try {
      const newTodo = await axios.delete(
        "https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/todos",
        {
          data: { id: deleteId },
        }
      );
      return newTodo;
    } catch {
      console.error("err");
    }
  }
);

export const updateToDo = createAsyncThunk(
  "toDoList/updateToDo",
  async (updatedTodo: Todo, { dispatch, getState }) => {
    try {
      const updatedTodos = await axios.put(
        "https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/todos",
        {
          todo: updatedTodo,
        }
      );
      return updatedTodos;
    } catch {
      console.error("err");
    }
  }
);
export const signUp = createAsyncThunk(
  "toDoList/signUp",
  async (updatedTodo, { dispatch, getState }) => {}
);
export const signIn = createAsyncThunk(
  "toDoList/signIn",
  async (updatedTodo, { dispatch, getState }) => {}
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
    },
    setShowDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteModal = action.payload;
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
        const allToDos = action?.payload?.data || [];

        state.toDoList = allToDos;
      })
      .addCase(getAllToDo.rejected, (state, action) => {});
    // deleteToDo
    builder
      .addCase(deleteToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteToDo.fulfilled, (state, action) => {
        state.loading = false;

        const allToDos = action?.payload?.data || [];
        state.toDoList = allToDos;
        enqueueSnackbar("Todo deleted successfully", {
          variant: "success",
        });
      })
      .addCase(deleteToDo.rejected, (state, action) => {
        enqueueSnackbar("Todo could not be deleted", {
          variant: "error",
        });
      });
    // createToDo
    builder
      .addCase(createToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createToDo.fulfilled, (state, action) => {
        state.loading = false;
        enqueueSnackbar("Todo created and saved.", {
          variant: "success",
        });
        const allToDos = action?.payload?.data || [];
        state.toDoList = allToDos;
      })
      .addCase(createToDo.rejected, (state, action) => {
        enqueueSnackbar("Todo could not be saved", {
          variant: "error",
        });
      });
    // updateToDoStatus
    builder
      .addCase(updateToDoStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateToDoStatus.fulfilled, (state, action) => {
        state.loading = false;
        enqueueSnackbar("Todo status updated and saved.", {
          variant: "success",
        });
        const allToDos = action?.payload?.data || [];
        state.toDoList = allToDos;
      })
      .addCase(updateToDoStatus.rejected, (state, action) => {
        enqueueSnackbar("Todo status updatecould not be saved", {
          variant: "error",
        });
      });
    // updateToDo
    builder
      .addCase(updateToDo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateToDo.fulfilled, (state, action) => {
        state.loading = false;
        enqueueSnackbar("Todo updated and saved.", {
          variant: "success",
        });
        console.log("action.payload.data", action.payload);
        const allToDos = action?.payload?.data || [];
        state.toDoList = allToDos;
      })
      .addCase(updateToDo.rejected, (state, action) => {
        enqueueSnackbar("Todo could not be saved", {
          variant: "error",
        });
      });
  },
});

export const { setLoading, setShowTodoModal, setShowDeleteModal, setDeleteId } =
  toDoListSlice.actions;

export default toDoListSlice.reducer;
