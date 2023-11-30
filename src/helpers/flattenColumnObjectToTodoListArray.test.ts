import { flattenColumnObjectToTodoListArray } from "./flattenColumnObjectToTodoListArray";

const column = {
  toDo: {
    name: "To do",
    items: [
      {
        _id: "6568afffc53d6506d79630dd",
        id: "5ccd4051-b52f-425d-96ab-fa23209b539b",
        title: "to do ",
        details: "to do",
        column: "Done",
        __v: 0,
      },
    ],
  },
  inProgress: {
    name: "In progress",
    items: [
      {
        _id: "6568afffc53d6506d79630db",
        id: "f404604e-ca07-426c-9f63-8b884eaa1330",
        title: "updated title",
        details: "test description",
        column: "In progress",
        __v: 0,
      },
      {
        _id: "6568afffc53d6506d79630dc",
        id: "cc991917-c535-4abd-b926-33b1428d4065",
        title: "test title",
        details: "test description",
        column: "In progress",
        __v: 0,
      },
    ],
  },
  done: {
    name: "Done",
    items: [],
  },
};

test("flattenColumnObjectToTodoListArray", () => {
  const array = flattenColumnObjectToTodoListArray(column);
  expect(array).toHaveLength(3);
  expect(array[0]).toHaveProperty("id");
  expect(array[0]).toHaveProperty("title");
  expect(array[0]).toHaveProperty("details");
  expect(array[0]).toHaveProperty("column");
});
