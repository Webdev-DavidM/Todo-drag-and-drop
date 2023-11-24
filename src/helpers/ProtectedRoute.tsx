import React from "react";
import { useAppSelector } from "../hooks/hooks";
import Login from "../components/pages/Login";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const authenticated = useAppSelector((state) => state.toDoList.authenticated);

  return <div>{authenticated ? children : <Login />}</div>;
}

export default ProtectedRoute;
