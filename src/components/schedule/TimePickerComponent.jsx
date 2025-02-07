import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@telegram-apps/telegram-ui";

export default function TimePickerComponent({ onSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = () => {
    if (!selectedDate) {
      alert("Выберите дату и время!");
      return;
    }

    const data = {
      date: selectedDate.toISOString().split("T")[0].replace(/-/g, "."), //временно используем . вместо - в формате даты
      // date: selectedDate.toISOString().split("T")[0], // YYYY-MM-DD
      time: selectedDate.toTimeString().split(" ")[0], // HH:MM:SS
    };

    onSelect(data); // Возвращаем JSON в `ShedulePage`
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>Выберите дату и время:</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm"
        timeIntervals={90}
      />
      <div style={{ margin: "10px 0" }}>
        <Button onClick={handleConfirm}>Подтвердить</Button>
      </div>
    </div>
  );
}
