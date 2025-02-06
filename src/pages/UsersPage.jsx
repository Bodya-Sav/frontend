import { useState, useEffect } from "react";

import { getAllUsers } from "../services/UserService";
import ListOfUsersComponent from "../components/users/ListOfUsersComponent";

export default function UsersPage() {
  const [users, seUsers] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then(seUsers)
      .catch((error) => console.error("Ошибка загрузки пользователей:", error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <ListOfUsersComponent users={users} />
    </div>
  );
}
