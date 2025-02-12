// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function ListOfCoursesComponent({ courses }) {
//   if (!courses || !courses.result || courses.result.length === 0) {
//     return <div>Загрузка курсов</div>;
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h2>Курсы</h2>
//       <ul>
//         {courses.result.map(({ id, title, admin }) => {
//           return (
//             <li key={id} style={{ marginBottom: "1em" }}>
//               <strong>название курса:</strong> {title} <br />
//               <strong>имя админа:</strong> {admin.fio} <br />
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListOfCoursesComponent({ courses }) {
  const navigate = useNavigate();

  if (!courses || !courses.result || courses.result.length === 0) {
    return <div>Курсы отсутствуют</div>;
  }

  return (
    <div>
      <h2>Список курсов</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {courses.result.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/${course.id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
            }}
          >
            <h3>{course.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
