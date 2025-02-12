// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@telegram-apps/telegram-ui";
// import { BiPencil, BiPlus } from "react-icons/bi";
// // import {
// //   getTopicById,
// //   updateTopicInfo,
// //   addQuestion,
// // } from "../services/TopicService";

// export default function TopicDetailPage() {
//   const { courseId, topicId } = useParams();
//   const [topic, setTopic] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");

//   useEffect(() => {
//     getTopicById(topicId)
//       .then(setTopic)
//       .catch((error) => console.error("Ошибка загрузки темы:", error));
//   }, [topicId]);

//   const handleUpdateTopic = async () => {
//     try {
//       await updateTopicInfo(topicId, editedTitle);
//       setEditMode(false);
//       const updatedTopic = await getTopicById(topicId);
//       setTopic(updatedTopic);
//     } catch (error) {
//       console.error("Ошибка обновления темы:", error);
//     }
//   };

//   if (!topic) return <p>Загрузка темы...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         {editMode ? (
//           <>
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               style={{ fontSize: "24px" }}
//             />
//             <Button onClick={handleUpdateTopic}>
//               <BiPencil />
//             </Button>
//             <Button onClick={() => setEditMode(false)}>Отмена</Button>
//           </>
//         ) : (
//           <>
//             <h2>{topic.title}</h2>
//             <Button
//               onClick={() => {
//                 setEditMode(true);
//                 setEditedTitle(topic.title);
//               }}
//             >
//               <BiPencil />
//             </Button>
//           </>
//         )}
//       </header>

//       <section style={{ marginTop: "20px" }}>
//         <h3>Вопросы</h3>
//         <ul>
//           {topic.questions && topic.questions.length > 0 ? (
//             topic.questions.map((q) => <li key={q.id}>{q.text}</li>)
//           ) : (
//             <p>Вопросы отсутствуют</p>
//           )}
//         </ul>
//         <Button
//           onClick={() => {
//             /* открыть форму добавления вопроса */
//           }}
//         >
//           <BiPlus /> Добавить вопрос
//         </Button>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { BiArrowBack, BiPencil, BiPlusCircle } from "react-icons/bi";

// Статичные данные для темы
const staticTopic = {
  id: 101,
  title: "Основы React",
  questions: [
    { id: 1, text: "Что такое JSX?" },
    { id: 2, text: "Что такое компоненты?" },
  ],
};

export default function TopicDetailPage() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    // Имитируем получение темы (в реальном случае выбираем тему по topicId)
    setTopic(staticTopic);
  }, [topicId]);

  const handleUpdateTopic = () => {
    // Имитация обновления темы
    setTopic((prev) => ({ ...prev, title: editedTitle }));
    setEditMode(false);
  };

  if (!topic) return <p>Загрузка темы...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Кнопка "Назад" */}
        <Button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <BiArrowBack size={24} />
        </Button>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ fontSize: "24px" }}
            />
            <Button onClick={handleUpdateTopic}>
              <BiPencil size={24} />
            </Button>
            <Button onClick={() => setEditMode(false)}>Отмена</Button>
          </>
        ) : (
          <>
            <h2 style={{ margin: 0 }}>{topic.title}</h2>
            <Button
              onClick={() => {
                setEditMode(true);
                setEditedTitle(topic.title);
              }}
            >
              <BiPencil size={24} />
            </Button>
          </>
        )}
      </header>

      <section style={{ marginTop: "20px" }}>
        <h3>Вопросы</h3>
        <ul>
          {topic.questions && topic.questions.length > 0 ? (
            topic.questions.map((q) => <li key={q.id}>{q.text}</li>)
          ) : (
            <p>Вопросы отсутствуют</p>
          )}
        </ul>
        <Button
          onClick={() => alert("Форма добавления вопроса пока не реализована")}
          style={{ marginTop: "20px" }}
        >
          <BiPlusCircle size={24} /> Добавить вопрос
        </Button>
      </section>
    </div>
  );
}
