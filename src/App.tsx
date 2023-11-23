// Store
import { useAppSelector } from "./hooks/hooks";

// Components
import todos from "./todos.json";

// Mui
import { Box, CircularProgress, Grid, Modal, Typography } from "@mui/material";
import Board from "./components/Board";

function App() {
  const toDos = useAppSelector((state) => state.toDoList.toDoList);
  const loading = useAppSelector((state) => state.toDoList.loading);

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
      <Typography
        variant="h3"
        color="primary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 1,
        }}
      >
        Todo list
      </Typography>

      <Typography
        variant="h5"
        color="primary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 1,
        }}
      >
        Please drag and drop your todos in the relevant columns
      </Typography>
      {/* // need to fix this statement below */}
      {/* {!loading && toDos?.length === 0 && <Board />} */}
      <Board />

      <Modal open={loading}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size="3rem" data-cy="loading-spinner" />
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}

export default App;
