import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";

// Mui
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { setShowDeleteModal } from "../redux/toDoListReducer";

// Store

function DeleteModal() {
  const dispatch = useAppDispatch();

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
              <Button size="small" variant="contained" type="submit">
                Delete
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(setShowDeleteModal(false))}
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
