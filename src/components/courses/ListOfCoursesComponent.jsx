const ListOfCoursesComponent = ({ courses }) => {
  if (!courses || !courses.result || courses.result.length === 0) {
    return <div>Загрузка курсов</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Курсы</h2>
      <ul>
        {courses.result.map(({ id, title, admin }) => {
          return (
            <li key={id} style={{ marginBottom: "1em" }}>
              <strong>название курса:</strong> {title} <br />
              <strong>имя админа:</strong> {admin.fio} <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListOfCoursesComponent;
