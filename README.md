https://github.com/Webdev-DavidM/Todo-drag-and-drop/assets/56081000/adb2e345-d69b-4e45-8ade-7df485222dd6

**Key feature**

1. Typescript
2. Drag and drop kanban style to do list
3. Custom hooks
4. React redux
5. Material Ui
6. Toast pop up for successful saves to the server

**Still to do**

1. Fix the glitch when items are dragged- FIXED, video updated to show this- done
2. Improve the UI styling- done
3. Add JWT to authorise changing the todos
4. Host the react app on aws s3 and the backend via serverless framework to a api lambda proxy
5. Add a ci/cd pipeline to automatically deploy once tests are passed via github to s3
6. Create a login and sign up so the protected route can work
7. Show the saved board for a selected user
8. Creat testing with jest and react testing library which would include the following tests

i)If the user is not logged in they are taken to the login screen

ii)If their login is unsucessfult they get a message saying “login unsuccessful

iii) If they try to go directly to the board route without authentication they are sent back to the log in screen

iv) If the user deletes an item, it will not show in the ui anymore

If the user edits a todo and save the ui is updated

v) If you click edit the field changes from to become editable

vi) If I create a todo it shows in the ui

vii)If I put a array into this hook it will return an object sorted into columns
