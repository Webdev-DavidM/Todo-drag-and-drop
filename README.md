# React Typescript Todo Kanban 

## Overview

This todo application is based around a kanban drag and drop board making tracking tasks from left to right easy and intuitive.

## Features

- The user can create a todo
- The user can update a todo
- The user can delete a todo
- The user drag and drop the todo the relevant column
- Changes are saved to a database
- Modals, loading spinners and toast alerts all improve the UX.

## Screenshot

![](/todo.kanban.png)

## Live site

http://davidm-kanban-todo-project.s3-website.eu-west-2.amazonaws.com/

## My process

Built with

- React
- Typescript
- Cypress and Jest testing
- Form validation with yup and formik
- Material UI for the interface components
- React beautiful d and d
- Custom hooks
- Redux
- CI/CD pipeline via githubs actions deploying the app to AWS S3 after tests are successfully passed
- Backend is Node, Express and MongoDB hosted on a AWS Lambda proxy integration via AWS API gateway

### Still to do

- Create a login and sign up page which saves the todos for a particular user
- The board route is protected
- JWT tokens are used to authorize making todo changes.
- Resolve any console warnings.

# To run locally

To run this project please download and from the terminal

- type npm i to load the dependencies

- npm start to view the project.


