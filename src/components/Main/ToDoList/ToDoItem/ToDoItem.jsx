import React from "react";
//import "./ToDoItem.css";

const ToDoItem = ({data, remove, update}) => {
  const {day, task, priority, status, category} = data
  console.log(data);
  
  return <article>
    <h4>{day}</h4>
    <p>Task: {task}</p>
    <p>Priority: {priority}</p>
    <p>Status: {status}</p>
    <p>Category: {category}</p>
    <button onClick={remove}>Borrar</button>
    <button onClick={update}>Editar</button>
  </article>;
};

export default ToDoItem;
