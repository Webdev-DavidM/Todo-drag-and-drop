import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  getAllToDo,
  setShowTodoModal,
  updateToDo,
} from "../../redux/toDoListReducer";
import { useSelector } from "react-redux";

// Custom hook
import { useSortItemsIntoColumns } from "../../hooks/useSortIntoColumns";

// Components
import Todo from "./Todo";

// Types
// import { Todo } from "../../types";

// const onDragEnd = (result: any, columns: any, setColumns: any, toDos: any) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   // updates the column value of the todo to a value the server will understand
//   const sourceColumn = (source: any) => {
//     switch (source.droppableId) {
//       case "toDo":
//         return "To do";
//       case "inProgress":
//         return "In Progress";
//       case "done":
//         return "Done";
//       default:
//         return;
//     }
//   };

//   let itemToMove = toDos.filter((item: any) => {
//     return item.column === sourceColumn(source);
//   });
//   itemToMove = itemToMove[source.index];
//   const columnToMoveTo = sourceColumn(destination);
//   console.log(itemToMove);
//   console.log(destination);
//   console.log(columnToMoveTo);

//   const updatedItem = {
//     ...itemToMove,
//     column: columnToMoveTo,
//   };
//   dispatch(updateToDo(updatedItem))

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];

//     const destColumn = columns[destination.droppableId];

//     const sourceItems = [...sourceColumn.items];

//     const destItems = [...destColumn.items];

//     const [removed] = sourceItems.splice(source.index, 1);

//     destItems.splice(destination.index, 0, removed);

//     // the todo to move is from

//     // in progress value so i know where to put the item

//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems,
//       },
//     });
//   }
// };

function Board() {
  const [columns, setColumns] = useState(
    useSortItemsIntoColumns().sortedColumns
  );
  const theme = useTheme();
  const desktop = theme.breakpoints.up("lg");
  const { sortedColumns } = useSortItemsIntoColumns();
  const todos = useSelector((state: any) => state.toDoList.toDoList);
  const dispatch = useDispatch();

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // updates the column value of the todo to a value the server will understand
    const sourceColumn = (source: any) => {
      switch (source.droppableId) {
        case "toDo":
          return "To do";
        case "inProgress":
          return "In progress";
        case "done":
          return "Done";
        default:
          return;
      }
    };

    let itemToMove = todos.filter((item: any) => {
      return item.column === sourceColumn(source);
    });
    itemToMove = itemToMove[source.index];
    const columnToMoveTo = sourceColumn(destination);
    console.log(itemToMove);
    console.log(destination);
    console.log(columnToMoveTo);

    const updatedItem = {
      ...itemToMove,
      column: columnToMoveTo,
    };
    const updatedItems = dispatch(updateToDo(updatedItem));

    // setColumns(useSortItemsIntoColumns);

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[source.droppableId];

    //   const destColumn = columns[destination.droppableId];

    //   const sourceItems = [...sourceColumn.items];

    //   const destItems = [...destColumn.items];

    //   const [removed] = sourceItems.splice(source.index, 1);

    //   destItems.splice(destination.index, 0, removed);

    //   // the todo to move is from

    //   // in progress value so i know where to put the item

    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       items: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
  };

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
