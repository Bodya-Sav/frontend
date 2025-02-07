import React, { useState, useContext } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { updateUserInfo, getAllUsers } from "../../services/UserService";

import { AuthContext } from "../../context/AuthContext";

const UserEditor = ({ users, onCancel, onUpdate }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const { chatid } = useContext(AuthContext);

  // Обработчик выбора пользователя для редактирования
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Копируем данные для редактирования, чтобы не изменять исходный объект
    setEditedUser({ ...user });
  };

  // Обработчик изменений в форме
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Обработчик подтверждения изменений
  const handleConfirm = async () => {
    try {
      // Если какое-то поле не изменено, в editedUser оно уже содержит исходное значение
      await updateUserInfo(
        chatid, // предполагается, что chat_id присутствует в данных
        editedUser.fio,
        editedUser.isAdmin,
        editedUser.isAuth,
        editedUser.isDeleted
      );
      // После успешного обновления обновляем список пользователей и выходим из режима редактирования
      const newUsers = await getAllUsers();
      onUpdate(newUsers);
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error);
    }
  };

  // Если пользователь для редактирования не выбран, выводим список для выбора
  if (!selectedUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Выберите пользователя для редактирования:</h3>
        {users &&
          users.result &&
          users.result.map((user) => (
            <Button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              style={{ margin: "5px" }}
            >
              {user.fio}
            </Button>
          ))}
        <Button onClick={onCancel} style={{ marginTop: "10px" }}>
          Отмена
        </Button>
      </div>
    );
  }

  // Если выбран пользователь — отображаем форму редактирования
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Редактирование пользователя: {editedUser.fio}</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>
          ФИО:{" "}
          <input
            type="text"
            name="fio"
            value={editedUser.fio}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Админ:
          <input
            type="checkbox"
            name="isAdmin"
            checked={editedUser.isAdmin}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Авторизован:
          <input
            type="checkbox"
            name="isAuth"
            checked={editedUser.isAuth}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Помечен удаленным:
          <input
            type="checkbox"
            name="isDeleted"
            checked={editedUser.isDeleted}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <Button onClick={handleConfirm} style={{ margin: "5px" }}>
          Подтвердить изменения
        </Button>
        <Button onClick={onCancel} style={{ margin: "5px" }}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default UserEditor;
