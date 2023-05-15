import { useState, useEffect } from "react";

export default function Todo() {
  //Start Todo section
  const [status, setStatus] = useState("add");
  const [todoList, setTodoList] = useState(
    (!localStorage.getItem("todo") && []) ||
      JSON.parse(localStorage.getItem("todo"))
  );
  const [inputTodo, setInputTodo] = useState("");
  const [indexEdit, setIndexEdit] = useState(null);

  const todoButtonClick = () => {
    if (status == "add" && inputTodo.length > 0) {
      localStorage.setItem("todo", JSON.stringify([inputTodo, ...todoList]));
      setTodoList([inputTodo, ...todoList]);
    }
    if (status == "edit" && inputTodo.length > 0) {
      todoList[indexEdit] = inputTodo;
      localStorage.setItem("todo", JSON.stringify([...todoList]));
      setTodoList([...todoList]);
      setStatus("add");
      setIndexEdit(null);
    }
    if (status == "edit" && inputTodo.length == 0) {
      setStatus("add");
      setIndexEdit(null);
    }
    setInputTodo("");
  };

  const onEditTodo = (index) => {
    setStatus("edit");
    setInputTodo(todoList[index]);
    setIndexEdit(index);
  };

  function onDeleteTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todoList));
    setTodoList([...todoList]);
  }

  //End Todo section
  return (
    <div className="task">
      <h1>3. Todo list</h1>
      <div className="add-todo">
        <input
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <input type="button" value={status} onClick={todoButtonClick} />
      </div>
      <ul className="todo-list">
        {todoList?.map((todo, index) => (
          <li key={index} className="todo">
            <h5>{todo}</h5>
            <input
              type="button"
              onClick={() => onDeleteTodo(index)}
              value={"x"}
            />
            <input
              type="button"
              onClick={() => onEditTodo(index)}
              value={"Edit"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
