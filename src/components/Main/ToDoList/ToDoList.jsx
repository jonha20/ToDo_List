import React, { useState, useEffect, useRef } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import data from "./data.js";
import { v4 as uuidv4 } from 'uuid';

const ToDoList = () => {
  const [items, setItems] = useState(data);
  const [values, setValues] = useState({
    day: "",
    task: "",
    priority: "",
    status: "",
    category: "",
  });
  const [showMessage, setShowMessage] = useState(false); // Estado para el mensaje
  const [editIndex, setEditIndex] = useState(null); // Estado para rastrear la tarea que se está editando
  const timeoutRef = useRef(null); // Referencia para el temporizador

  const paintData = () =>
    items.map((item, index) => (
      <ToDoItem
        key={uuidv4()}
        data={item}
        remove={() => removeItem(index)}
        edit={() => startEditing(index)}
        complete={() => complete(index)}
        pending={() => pending(index)}
      />
    ));

  const addItem = (new_item) => {
    setItems([...items, new_item]);
  };

  const updateItem = (updated_item, index) => {
    const updatedItems = [...items];
    updatedItems[index] = updated_item;
    setItems(updatedItems);
  };

  const complete = (i) => {
    const completeItems = [...items];
    completeItems[i].status = "Completed";
    setItems(completeItems);
  };

  const pending = (i) => {
    const pendingItems = [...items];
    pendingItems[i].status = "Pending";
    setItems(pendingItems);
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

    // Reiniciar el temporizador al recibir entrada
    resetTimeout();
  };

  const handleSubmit = (item) => {
    item.preventDefault();

    if (editIndex !== null) {
      // Actualizar tarea existente
      updateItem(values, editIndex);
      setEditIndex(null); // Salir del modo de edición
    } else {
      // Añadir nueva tarea
      addItem(values);
    }

    setValues({
      day: "",
      task: "",
      priority: "",
      status: "",
      category: "",
    });

    setShowMessage(true);

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // Limpiar el temporizador después de enviar
    clearTimeout(timeoutRef.current);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setValues(items[index]); // Prellenar el formulario con los datos de la tarea seleccionada
    resetTimeout(); // Reiniciar el temporizador al iniciar la edición
  };

  const removeAllItems = () => setItems([]);
  const resetItems = () => setItems(data);

  const resetTimeout = () => {
    // Limpiar el temporizador existente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Configurar un nuevo temporizador de 10 segundos
    timeoutRef.current = setTimeout(() => {
      setValues({
        day: "",
        task: "",
        priority: "",
        status: "",
        category: "",
      });
    }, 10000);
  };

  // Limpiar el temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="day">Day</label>
        <br />
        <select
          type="text"
          value={values.day}
          name="day"
          minLength="6"
          required
          onChange={handleChange}
        >
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <br />

        <label htmlFor="task">Task</label>
        <br />
        <input
          type="text"
          value={values.task}
          name="task"
          minLength="6"
          required
          onChange={handleChange}
        />
        <br />

        <label htmlFor="priority">Priority</label>
        <br />
        <select
          type="text"
          value={values.priority}
          name="priority"
          required
          onChange={handleChange}
        >
          <option value="">Select a priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="Urgent">Urgent</option>
        </select>
        <br />

        <label htmlFor="status">Status</label>
        <br />
        <select
          type="text"
          value={values.status}
          name="status"
          minLength="6"
          required
          onChange={handleChange}
        >
          <option value="">Select a status</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>
        <br />

        <label htmlFor="category">Category</label>
        <br />
        <input
          type="text"
          value={values.category}
          name="category"
          minLength="6"
          required
          onChange={handleChange}
        />
        <br />
        {values.day &&
        values.task &&
        values.priority &&
        values.status &&
        values.category ? (
          <button type="submit">
            {editIndex !== null ? "Guardar cambios" : "Crear destino"}
          </button>
        ) : (
          <p>Por favor, completa todos los campos correctamente.</p>
        )}
      </form>

      {/* Mostrar el mensaje si showMessage es true */}
      {showMessage && <p className="success-message">Tarea añadida</p>}

      {paintData()}
      <div className="botones">
        <button className="BorrarTodo" onClick={removeAllItems}>
          Borrar todo
        </button>
        <button className="Recargar" onClick={resetItems}>
          Recargar
        </button>
      </div>
    </section>
  );
};

export default ToDoList;
