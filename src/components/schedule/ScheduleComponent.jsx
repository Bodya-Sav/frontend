const ScheduleComponent = ({ schedule }) => {
  if (!schedule || !schedule.result || schedule.result.length === 0) {
    return <div>Нет доступного расписания</div>;
  }

  return (
    <div style={{ display: flex, justifyItems: center }}>
      <h2>Расписание</h2>
      <ul>
        {schedule.result.map(({ id, fio, themes, data, time }) => {
          const formattedDate = new Date(data).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

          return (
            <li key={id}>
              <strong>Дата:</strong> {formattedDate} <br />
              <strong>Время:</strong> {time} <br />
              <strong>ФИО:</strong> {fio || "Не указано"} <br />
              <strong>Темы:</strong> {themes || "Нет информации"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScheduleComponent;
