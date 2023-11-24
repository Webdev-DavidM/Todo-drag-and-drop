// Store
import { useAppSelector } from "./hooks/hooks";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

// Mui
import { Button, Grid } from "@mui/material";

// Components
import Board from "./components/pages/Board";
import Loading from "./modals/Loading";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import CheckLocalStorage from "./helpers/CheckLocalStorage";
import ProtectedRoute from "./helpers/ProtectedRoute";
import AddTodo from "./modals/AddTodo";
import DeleteModal from "./modals/DeleteModal";

function App() {
  const toDos = useAppSelector((state) => state.toDoList.toDoList);
  const loading = useAppSelector((state) => state.toDoList.loading);
  const { showTodoModal } = useAppSelector((state) => state.toDoList);
  const { toDoModalColumn } = useAppSelector((state) => state.toDoList);
  const { showDeleteModal } = useAppSelector((state) => state.toDoList);
  console.log(loading);

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        position: "relative",
        p: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      {/* // need to fix this statement below */}
      {/* {!loading && toDos?.length === 0 && <Board />} */}

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
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
