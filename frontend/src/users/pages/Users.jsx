import React from "react";
import { useQuery } from "react-query";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

const Users = () => {
  const { isLoading, error, data } = useQuery("users", () => {
    return fetch("http://localhost:5000/api/users").then((res) => res.json());
  });

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return <UsersList items={data} />;
};

export default Users;
