import React from "react";
import { useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();

  return (
    <>
      <p>{id}</p>
    </>
  );
}

export default EditPage;
