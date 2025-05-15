import React from "react";
import "./ToDoItem.css";

const ToDoItem = ({data, remove, edit, complete, pending}) => {
  const {day, task, priority, status, category} = data
  console.log(data);
  
  return <article>
        <>
          <h4>{day}</h4>
          <p>Task: {task}</p>
          <p>Priority: {priority}</p>
          <p>Status: {status}</p>
          <p>Category: {category}</p>
          <button className="delete" onClick={remove}>Delete</button>
          <button className="edit" onClick={edit}>Edit</button>
          {status === "Completed" ?  <button className="pending" onClick={pending}>Pending</button> : <button className="complete" onClick={complete}>Complete</button>}
        </>
    </article>
   
};

export default ToDoItem;
