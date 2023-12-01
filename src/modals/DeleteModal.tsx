import { useAppSelector, useAppDispatch } from "../hooks/hooks";

// Mui
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@mui/material";

// Store
import {
  deleteToDo,
  setDeleteId,
  setShowDeleteModal,
} from "../redux/toDoListReducer";

function DeleteModal() {
  const dispatch = useAppDispatch();
  const deleteId = useAppSelector((state) => state.toDoList.deleteId);

  return (
    <Modal open={true}>
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
          <Card
            sx={{
              width: "30%",
              alignSelf: "flex-start",

              p: 1,
              margin: "auto",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" mt={2}>
                Are you sure you want to delete this todo?
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                type="submit"
                data-cy="delete-modal-confirmation"
                onClick={() => {
                  dispatch(setShowDeleteModal(false));
                  dispatch(deleteToDo(deleteId));
                  dispatch(setDeleteId(""));
                }}
              >
                Delete
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(setDeleteId(""));
                  dispatch(setShowDeleteModal(false));
                }}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
