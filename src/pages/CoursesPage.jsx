import React, { useState, useEffect, useContext } from "react";

import AddCourceComponent from "../components/courses/AddCourceComponent";

import { AuthContext } from "../context/AuthContext";

export default function CoursesPage() {
  const { isSuper, isAdmin, user_id } = useContext(AuthContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          height: "auto",
          marginBottom: "100px",
        }}
      >
        <h2>Страница с курсами</h2>
      </div>
    </>
  );
}
