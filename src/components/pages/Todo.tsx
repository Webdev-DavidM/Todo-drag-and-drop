import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useFormik } from "formik";

// validationSchema
import { validationSchema } from "../../helpers/validationSchema";
import {
  setDeleteId,
  setShowDeleteModal,
  updateToDo,
} from "../../redux/toDoListReducer";
import { Todo as TodoType } from "../../types";

type Props = {
  item: TodoType;
  provided: any;
};

const Todo = ({ item, provided }: Props) => {
  const dispatch = useAppDispatch();
  let initialFieldValues = {
    title: item.title,
    details: item.details,
  };
  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: initialFieldValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateToDo({
          id: item.id,
          title: values.title,
          details: values.details,
          column: item.column,
        })
      );
      // after succesful backend call
      setEdit(false);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <Card
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-cy="todo-card"
        sx={{
          width: "100%",
          border: "1px solid #e3e3e3",
        }}
      >
        <CardContent
          sx={{
            width: "100",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="primary.text"
          >
            Title
          </Typography>
          {edit ? (
            <TextField
              fullWidth
              size="small"
              name="title"
              data-cy="todo-input-title"
              placeholder="Enter a title for your todo"
              type="text"
              value={formik?.values?.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title ? formik.errors.title : ""}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                color: "primary.text",
              }}
            />
          ) : (
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color="primary.text"
              data-cy="todo-title"
            >
              {formik?.values?.title}
            </Typography>
          )}

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            mt={2}
            color="primary.text"
          >
            Description
          </Typography>
          {edit ? (
            <TextField
              fullWidth
              // multiline

              size="small"
              name="details"
              placeholder="Enter a description for your todo"
              type="text"
              value={formik?.values?.details}
              onChange={formik.handleChange}
              error={formik.touched.details && Boolean(formik.errors.details)}
              helperText={formik.touched.details ? formik.errors.details : ""}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                color: "primary.text",
              }}
            />
          ) : (
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color="primary.text"
            >
              {formik?.values?.details}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {!edit && (
            <Button
              data-cy="todo-edit-button"
              size="small"
              variant="outlined"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          )}

          {edit && (
            <Button
              size="small"
              variant="outlined"
              type="submit"
              data-cy="todo-save-button"
            >
              Save
            </Button>
          )}

          <Button
            size="small"
            variant="outlined"
            data-cy="todo-delete-button"
            color="secondary"
            onClick={() => {
              dispatch(setDeleteId(item.id));
              dispatch(setShowDeleteModal(true));
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Todo;
