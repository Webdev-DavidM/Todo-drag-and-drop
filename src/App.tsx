// Store
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Mui
import { Grid } from "@mui/material";

// Components
import Board from "./components/pages/Board";
import Loading from "./modals/Loading";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
// import ProtectedRoute from "./helpers/ProtectedRoute";
import AddTodo from "./modals/AddTodo";
import DeleteModal from "./modals/DeleteModal";

// Store
import { getAllToDo } from "./redux/toDoListReducer";

// Components

function App() {
  const loading = useAppSelector((state) => state.toDoList.loading);
  const { showTodoModal } = useAppSelector((state) => state.toDoList);
  const { toDoModalColumn } = useAppSelector((state) => state.toDoList);
  const { showDeleteModal } = useAppSelector((state) => state.toDoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllToDo());
  }, [dispatch]);

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        p: 3,
      }}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              // <ProtectedRoute>
              <Board />

              // </ProtectedRoute>
            );
          }}
        />
      </BrowserRouter>
      {/* Modals */}
      {loading && <Loading />}
      {showTodoModal && toDoModalColumn && <AddTodo column={toDoModalColumn} />}
      {showDeleteModal && <DeleteModal />}
    </Grid>
  );
}

export default App;
