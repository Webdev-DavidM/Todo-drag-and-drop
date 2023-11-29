import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { lime, purple } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useSortItemsIntoColumns } from '../../hooks/useSortIntoColumns';
import { flattenColumnObjectToTodoListArray } from '../../helpers/flattenColumnObjectToTodoListArray';
import { useDispatch } from 'react-redux';

// types
import { Columns } from '../../types';
import Todo from './Todo';
import {
  setShowTodoModal,
  updateToDoStatus,
} from '../../redux/toDoListReducer';

import { COLUMN } from '../../enums';

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
      const columnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      setColumns(columnsUpdated);
      const flattenedTodoList =
        flattenColumnObjectToTodoListArray(columnsUpdated);

      dispatch(updateToDoStatus(flattenedTodoList));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const columnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      setColumns(columnsUpdated);
      const flattenedTodoList =
        flattenColumnObjectToTodoListArray(columnsUpdated);
      dispatch(updateToDoStatus(flattenedTodoList));
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '1500px',
          border: '1px solid #e3e3e3',
          height: '100%',
          backgroundColor: 'primary.background',
          borderRadius: '10px',

          p: 3,
        }}>
        <Card
          sx={{
            width: '100%',
            border: '1px solid #e3e3e3',
          }}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              maxHeight: '80px',
              p: 1,
            }}>
            <Typography
              variant='h5'
              color='primary.text'
              sx={{
                width: '100%',
                textAlign: 'center',
              }}>
              Todo list
            </Typography>

            <Typography
              variant='body2'
              color='primary.text'
              sx={{
                width: '100%',
                textAlign: 'center',
              }}>
              Please drag and drop your todos in the relevant columns
            </Typography>
          </Grid>
        </Card>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '90%',
            p: 3,
            mt: 2.5,
            overflowY: 'auto',
            border: '1px solid #e3e3e3',
            borderBottom: '1px solid #7e7e7e',
          }}>
          {Object.entries(columns)?.map(([columnId, column], index) => {
            return (
              <Grid
                item
                xs={3.9}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  width: '25%',
                  backgroundColor: 'primary.background',
                  borderRadius: '10px',
                  height: '100%',
                  overflow: 'hidden',
                  border: '1px solid #e3e3e3',
                }}
                key={columnId}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  p={2}
                  sx={{
                    backgroundColor: 'primary.heading',
                    borderBottom: '1px solid #e3e3e3',
                  }}>
                  <Typography variant='h6' color='primary.text'>
                    {column.name}
                  </Typography>
                  <Button
                    size='small'
                    variant='outlined'
                    sx={{
                      background: 'white',
                    }}
                    color='primary'
                    onClick={() =>
                      dispatch(
                        setShowTodoModal({
                          showTodoModal: true,
                          column: column.name,
                        })
                      )
                    }>
                    Add todo
                  </Button>
                </Grid>
                <Grid
                  container
                  sx={{
                    overflowY: 'auto',
                  }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <Grid
                          container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            height: '100%',
                            overflowY: 'auto',
                            p: 2,
                            gap: 2,
                          }}>
                          {column?.items?.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
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
