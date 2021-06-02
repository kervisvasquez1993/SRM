import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = ({ task }) => {
    const {id} = useParams();

    return (
        <h1>Tarea {id}</h1>
    );
};

export default TaskDetails;
