import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { lime, purple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useSortItemsIntoColumns } from "../../hooks/useSortIntoColumns";
import { useDispatch } from "react-redux";
import {
  setShowDeleteModal,
  setShowTodoModal,
} from "../../redux/toDoListReducer";
import { enqueueSnackbar } from "notistack";
import Todo from "./Todo";

// const tasks = [
//   { id: "1", content: "First task" },
//   { id: "2", content: "Second task" },
//   { id: "3", content: "Third task" },
//   { id: "4", content: "Fourth task" },
//   { id: "5", content: "Fifth task" },
// ];

// const taskStatus = {
//   toDo: {
//     name: "To do",
//     items: tasks,
//   },
//   inProgress: {
//     name: "In Progress",
//     items: [],
//   },
//   done: {
//     name: "Done",
//     items: [],
//   },
// };

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Board() {
  const [columns, setColumns] = useState(
    useSortItemsIntoColumns().sortedColumns
  );
  const theme = useTheme();
  const desktop = theme.breakpoints.up("lg");

  const { sortedColumns } = useSortItemsIntoColumns();
  console.log("sortedColumns", sortedColumns);
  console.log("columns", columns);
  const dispatch = useDispatch();

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
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
          }}
        >
          Please drag and drop your todos in the relevant columns
        </Typography>
        {Object.entries(sortedColumns)?.map(([columnId, column], index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 300,
                border: "1px solid grey",
                p: 2,
                m: 2,
              }}
              key={columnId}
            >
              <Grid container justifyContent={"space-between"} px={2}>
                <Typography variant="h5">{column.name}</Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    dispatch(
                      setShowTodoModal({
                        showTodoModal: true,
                        column: column.name,
                      })
                    )
                  }
                >
                  Add todo
                </Button>
              </Grid>

              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <Grid
                      container
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        p: 2,
                        minWidth: 300,

                        height: 500,
                        overflowY: "auto",
                        m: 1,
                        gap: 3,
                      }}
                    >
                      {column?.items?.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return <Todo provided={provided} item={item} />;
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Grid>
                  );
                }}
              </Droppable>
            </Box>
          );
        })}
      </Grid>
    </DragDropContext>
  );
}

export default Board;
