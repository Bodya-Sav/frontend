const ListOfUsersComponent = ({ users }) => {
  if (!users || !users.result || users.result.length === 0) {
    return <div>Загрузка пользователей</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Пользователи</h2>
      <ul>
        {users.result.map(({ id, fio, isAdmin, isAuth, isDeleted }) => {
          return (
            <li key={id} style={{ marginBottom: "1em" }}>
              <strong>фио:</strong> {fio} <br />
              <strong>наличие админки:</strong> {isAdmin ? "Да" : "Нет"} <br />
              <strong>авторизован:</strong> {isAuth ? "Да" : "Нет"} <br />
              <strong>помечен удаленным:</strong> {isDeleted ? "Да" : "Нет"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListOfUsersComponent;
