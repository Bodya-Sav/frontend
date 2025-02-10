import React, { useState, useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const TopPanelComponent = () => {
  const { selectedCourse, setSelectedCourse, courseList } =
    useContext(CourseContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setIsDropdownOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "20px" }}>
          {selectedCourse ? selectedCourse.title : "Выберите курс"}
        </h1>
        <button
          onClick={toggleDropdown}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Показать список курсов"
        >
          {isDropdownOpen ? (
            <BiChevronUp size={24} />
          ) : (
            <BiChevronDown size={24} />
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div style={{ borderTop: "1px solid #ccc", backgroundColor: "#fff" }}>
          {courseList && courseList.length > 0 ? (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: "10px 20px",
              }}
            >
              {courseList.map((course) => (
                <li
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  style={{
                    padding: "5px 0",
                    cursor: "pointer",
                  }}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: "10px 20px" }}>Курсы не найдены</div>
          )}
        </div>
      )}
    </header>
  );
};

export default TopPanelComponent;
