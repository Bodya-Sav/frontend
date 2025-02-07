// import { useState, useEffect } from "react";

// import { getAllUsers } from "../services/UserService";
// import ListOfUsersComponent from "../components/users/ListOfUsersComponent";

// export default function UsersPage() {
//   const [users, seUsers] = useState(null);

//   useEffect(() => {
//     getAllUsers()
//       .then(seUsers)
//       .catch((error) => console.error("Ошибка загрузки пользователей:", error));
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyItems: "center",
//       }}
//     >
//       <ListOfUsersComponent users={users} />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { getAllUsers } from "../services/UserService";
import ListOfUsersComponent from "../components/users/ListOfUsersComponent";
import UserEditor from "../components/users/UserEditor";

export default function UsersPage() {
  const [users, setUsers] = useState(null);
  // Флаг, показывающий, включен ли режим редактирования
  const [editMode, setEditMode] = useState(false);

  const fetchUsers = () => {
    getAllUsers()
      .then(setUsers)
      .catch((error) => console.error("Ошибка загрузки пользователей:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Если режим редактирования не включён, показываем список пользователей
  if (!editMode) {
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
        <Button onClick={() => setEditMode(true)} style={{ marginTop: "1em" }}>
          Изменить данные
        </Button>
      </div>
    );
  }

  // Если режим редактирования включён, отображаем компонент редактирования
  return (
    <UserEditor
      users={users}
      onCancel={() => setEditMode(false)}
      onUpdate={(newUsers) => {
        setUsers(newUsers);
        setEditMode(false);
      }}
    />
  );
}
