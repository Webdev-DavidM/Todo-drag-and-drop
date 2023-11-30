import { Button, Card, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

// Components
import Todo from "./Todo";

// Hooks
import { useSortItemsIntoColumns } from "../../hooks/useSortIntoColumns";
import { useOnDragEnd } from "../../hooks/useOnDragEnd";

// types
import { Columns } from "../../types";

// Store
import { setShowTodoModal } from "../../redux/toDoListReducer";

// Enums
import { COLUMN } from "../../enums";

function Board() {
  const [columns, setColumns] = useState<Columns>({
    toDo: {
      name: COLUMN.TO_DO,
      items: [],
    },
    inProgress: {
      name: COLUMN.IN_PROGRESS,
      items: [],
    },
    done: {
      name: COLUMN.DONE,
      items: [],
    },
  });
  const dispatch = useDispatch();

  useSortItemsIntoColumns(setColumns);
  const { onDragEnd } = useOnDragEnd();

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "1500px",
          border: "1px solid #e3e3e3",
          height: "100%",
          backgroundColor: "primary.background",
          borderRadius: "10px",

          p: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            border: "1px solid #e3e3e3",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              maxHeight: "80px",
              p: 1,
            }}
          >
            <Typography
              variant="h5"
              color="primary.text"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Todo list
            </Typography>

            <Typography
              variant="body2"
              color="primary.text"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Please drag and drop your todos in the relevant columns
            </Typography>
          </Grid>
        </Card>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "10px",
            height: "90%",
            p: 3,
            mt: 2.5,
            overflowY: "auto",
            border: "1px solid #e3e3e3",
            borderBottom: "1px solid #7e7e7e",
          }}
        >
          {Object.entries(columns)?.map(([columnId, column], index) => {
            return (
              <Grid
                item
                xs={3.9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  width: "25%",
                  backgroundColor: "primary.background",
                  borderRadius: "10px",
                  height: "100%",
                  overflow: "hidden",
                  border: "1px solid #e3e3e3",
                }}
                key={columnId}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  p={2}
                  sx={{
                    backgroundColor: "primary.heading",
                    borderBottom: "1px solid #e3e3e3",
                  }}
                >
                  <Typography variant="h6" color="primary.text">
                    {column.name}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      background: "white",
                    }}
                    data-cy="add-todo-button"
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
                <Grid
                  container
                  sx={{
                    overflowY: "auto",
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <Grid
                          container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            height: "100%",
                            overflowY: "auto",
                            p: 2,
                            gap: 2,
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
                                  return (
                                    <Todo provided={provided} item={item} />
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
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default Board;
