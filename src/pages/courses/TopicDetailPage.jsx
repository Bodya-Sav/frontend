import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { BiPencil, BiPlus } from "react-icons/bi";
import {
  getTopicById,
  updateTopicInfo,
  addQuestion,
} from "../services/TopicService";

export default function TopicDetailPage() {
  const { courseId, topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    getTopicById(topicId)
      .then(setTopic)
      .catch((error) => console.error("Ошибка загрузки темы:", error));
  }, [topicId]);

  const handleUpdateTopic = async () => {
    try {
      await updateTopicInfo(topicId, editedTitle);
      setEditMode(false);
      const updatedTopic = await getTopicById(topicId);
      setTopic(updatedTopic);
    } catch (error) {
      console.error("Ошибка обновления темы:", error);
    }
  };

  if (!topic) return <p>Загрузка темы...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ fontSize: "24px" }}
            />
            <Button onClick={handleUpdateTopic}>
              <BiPencil />
            </Button>
            <Button onClick={() => setEditMode(false)}>Отмена</Button>
          </>
        ) : (
          <>
            <h2>{topic.title}</h2>
            <Button
              onClick={() => {
                setEditMode(true);
                setEditedTitle(topic.title);
              }}
            >
              <BiPencil />
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
          onClick={() => {
            /* открыть форму добавления вопроса */
          }}
        >
          <BiPlus /> Добавить вопрос
        </Button>
      </section>
    </div>
  );
}
