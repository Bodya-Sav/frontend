const ListOfUsersComponent = ({ users }) => {
  if (!users || !users.result || users.result.length === 0) {
    return <div>Нет доступных пользователей</div>;
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
        {users.result.map(({ id, fio, isadmin, isauth, isdeleted }) => {
          return (
            <li key={id}>
              <strong>фио:</strong> {fio} <br />
              <strong>наличие админки:</strong> {isadmin ? "Да" : "Нет"} <br />
              <strong>авторизован:</strong> {isauth ? "Да" : "Нет"} <br />
              <strong>помечен удаленным:</strong> {isdeleted ? "Да" : "Нет"}
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListOfUsersComponent;
