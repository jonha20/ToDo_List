import React from "react";
import "./ToDoItem.css";

const ToDoItem = ({data, remove, edit}) => {
  const {day, task, priority, status, category} = data
  console.log(data);
  
  return <article>
    <h4>{day}</h4>
    <p>Task: {task}</p>
    <p>Priority: {priority}</p>
    <p>Status: {status}</p>
    <p>Category: {category}</p>
    <button className="remove" onClick={remove}>Borrar</button>
    <button className="update" onClick={edit}>Editar</button>
  </article>;
};

export default ToDoItem;
