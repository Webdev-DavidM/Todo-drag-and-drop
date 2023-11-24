import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { lime, purple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useSortItemsIntoColumns } from "../../hooks/useSortIntoColumns";

const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const taskStatus = {
  toDo: {
    name: "To do",
    items: tasks,
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

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
  const [columns, setColumns] = useState(taskStatus);
  const theme = useTheme();
  const desktop = theme.breakpoints.up("lg");
  const toDos = useSelector((state: any) => state.toDoList.toDoList);
  const { sortedColumns } = useSortItemsIntoColumns(toDos);
  console.log("sortedColumns", sortedColumns);
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
            mt: 1,
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
              <Typography variant="h5">{column.name}</Typography>

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
                        console.log("item", typeof item.id);
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    maxWidth: 345,
                                    alignSelf: "flex-start",
                                    backgroundColor: lime[50],
                                    p: 1,
                                  }}
                                >
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {item.title}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {item.details}
                                    </Typography>
                                  </CardContent>
                                  <CardActions
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Button size="small" variant="contained">
                                      Edit
                                    </Button>
                                    <Button size="small" variant="contained">
                                      Delete
                                    </Button>
                                  </CardActions>
                                </Card>
                              );
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