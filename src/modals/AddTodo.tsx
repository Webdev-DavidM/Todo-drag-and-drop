import { useAppDispatch } from "../hooks/hooks";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

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

// Store
import { setShowTodoModal } from "../redux/toDoListReducer";
import { createToDo } from "../redux/toDoListReducer";

// validationSchema
import { validationSchema } from "../helpers/validationSchema";

type Props = {
  column: string;
};

function AddTodo({ column }: Props) {
  const dispatch = useAppDispatch();
  let initialFieldValues = {
    title: "",
    details: "",
  };

  const formik = useFormik({
    initialValues: initialFieldValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { title, details } = values;

      if (title && details) {
        const id = uuidv4();
        const todo = {
          id: id,
          title,
          details,
          column,
        };
        dispatch(
          setShowTodoModal({
            showTodoModal: false,
            column: "",
          })
        );
        dispatch(createToDo(todo));
      }
    },
  });
  return (
    <Modal open={true}>
      <form onSubmit={formik.handleSubmit}>
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
                width: "50%",
                alignSelf: "flex-start",

                p: 1,
                margin: "auto",
              }}
            >
              <CardContent>
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={2}
                >
                  <Typography variant="h6">Create your todo</Typography>
                  <Button variant="contained" disabled={true}>
                    {column}
                  </Button>
                </Grid>
                <Typography gutterBottom variant="h6" component="div">
                  Title
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  placeholder="Enter a title for your todo"
                  data-cy="todo-input-title"
                  type="text"
                  value={formik?.values?.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title ? formik.errors.title : ""}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />

                <Typography gutterBottom variant="h6" component="div" mt={2}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="details"
                  placeholder="Enter a description for your todo"
                  data-cy="todo-input-description"
                  type="text"
                  value={formik?.values?.details}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.details && Boolean(formik.errors.details)
                  }
                  helperText={
                    formik.touched.details ? formik.errors.details : ""
                  }
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  data-cy="todo-save-button"
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    dispatch(
                      setShowTodoModal({
                        showTodoModal: false,
                        column: "",
                      })
                    )
                  }
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Box>
      </form>
    </Modal>
  );
}

export default AddTodo;
