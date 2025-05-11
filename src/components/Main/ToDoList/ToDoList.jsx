import React from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import data from "./data.js";

const ToDoList = () => {
  // Estado inicial del array de destinos
  const [items, setItems] = useState(data); // [{},{},{}]
  console.log(data);

  // Estado inicial del formulario
  const [values, setValues] = useState({
    day: "",
    task: "",
    priority: "",
    status: "",
    category: "",
  });

  const paintData = () =>
    items.map((item, index) => (
      <ToDoItem key={index} data={item} remove={() => removeItem(index)} />
    ));
  const addItem = (new_item) => {
    setItems([...items, new_item]);
  };
  const removeItem = (i) => {
    items.splice(i, 1);
    setItems([...items]);
  };

  const handleChange = (item) => {
    setValues({
      ...values,
      [item.target.name]: item.target.value,
    });
  };
  const handleSubmit = (item) => {
    item.preventDefault();
    addItem(values);

    setValues({
      day: "",
      task: "",
      priority: "",
      status: "",
      category: "",
    });

    /*  // Generar un objeto vacío dinámicamente -- Copilot
  const emptyValues = Object.keys(values).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});

  setValues(emptyValues);*/
  };
  const removeAllItems = () => setItems([]);
  const resetItems = () => setItems(data);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="day">Day</label>
        <br />
        <input type="text" value={values.day} name="day" onChange={handleChange} />
        <br />

        <label htmlFor="task">Task</label>
        <br />
        <input type="text" value={values.task} name="task" onChange={handleChange} />
        <br />

        <label htmlFor="priority">Priority</label>
        <br />
        <input type="text" value={values.priority} name="priority" onChange={handleChange} />
        <br />

        <label htmlFor="status">Status</label>
        <br />
        <input type="text" value={values.status} name="status" onChange={handleChange} />
        <br />

        <label htmlFor="category">Category</label>
        <br />
        <input type="text" value={values.category} name="category" onChange={handleChange} />
        <br />

        {values.day &&
        values.task &&
        values.priority &&
        values.status &&
        values.category ? (
          <button type="submit">Crear destino</button>
        ) : (
          <b>Rellena todos los campos para poder enviar</b>
        )}
      </form>
      {paintData()}
      <div className="botones">
      <button className="BorrarTodo" onClick={removeAllItems}>Borrar todo</button>
      <button className="Recargar" onClick={resetItems}>Recargar</button>
      </div>
      
    </section>
  );
};

export default ToDoList;
