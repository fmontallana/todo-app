import React, { useEffect, useState } from "react";
import { GrFormAdd, GrFormClose } from "react-icons/gr";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getDayTime } from "../helpers/useGetDayTime";
import Table from "./Table";
import TaskSummary from "./TaskSummary";

function Todo() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [counter, setCounter] = useLocalStorage("counter", 1);
  const [client, setClient] = useLocalStorage("client", ["ACCC", "BCA"]);
  const [todoInput, setTodoInput] = useState("");
  const [clientInput, setClientInput] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoInput) {
      alert("Please input your task. :)");
      return;
    }

    setTodoInput("");
    console.log(todos);

    const newTodo = {
      //   id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      id: counter,
      todo: todoInput,
      client: selectedClient,
      status: 0,
      dateAdded: new Date(),
      dateModified: null,
    };

    setTodos([...todos, newTodo]);
    setCounter((prev) => prev + 1);
  };

  const removeTodo = (id) => {
    if (!confirm("Are you sure?")) return;

    const newTodos = todos.filter((todos) => todos.id != id);
    setTodos(newTodos);
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status ? 0 : 1, dateModified: new Date() }
        : todo
    );

    console.log(newTodos);
    setTodos(newTodos);
  };

  const addClient = () => {
    const isAdded = client.find(
      (value) => value.toLowerCase() == clientInput.toLowerCase()
    );

    if (isAdded) {
      alert("Client name already in the list.");
      return;
    }

    setClientInput("");
    setClient((prev) => [...prev, clientInput]);
    alert("Client added!");
  };

  const removeClient = () => {
    if (selectedClient === "") return;
    const newClient = client.filter((item, index) => item !== clientInput);
    setClient(newClient);
    alert("Client remove!");
    setClientInput("");
  };

  return (
    <div className=" h-full">
      <div className="w-11/12 lg:w-10/12 mx-auto py-6 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 rounded-box ">
          <h1 className="text-lg font-bold">Task Manager</h1>
          <br />
          <form className="flex flex-col w-full" onSubmit={(e) => addTodo(e)}>
            <div className="form-control mb-2 flex justify-between w-full">
              <input
                className="input input-sm input-bordered flex-1"
                type="text"
                placeholder="Enter your task"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
            </div>
            <div className=" mb-2 flex lg:justify-evenly w-full">
              <select
                className="w-5/12 lg:flex-1 select select-sm select-bordered rounded-r-none"
                onChange={(e) => {
                  setSelectedClient(e.target.value);
                  setClientInput(e.target.value);
                }}
              >
                <option value={""} defaultValue={""}>
                  Select Client
                </option>
                {client.map((client, index) => {
                  return (
                    <option key={index} value={client}>
                      {client}
                    </option>
                  );
                })}
              </select>
              <input
                className="w-5/12 lg:flex-1 input input-sm input-bordered rounded-none"
                type="text"
                placeholder="or add new"
                value={clientInput}
                onChange={(e) => setClientInput(e.target.value)}
              />
              <button
                className="lg:w-1/12 btn btn-sm btn-info rounded-l-none rounded-none "
                type="button"
                onClick={addClient}
              >
                <GrFormAdd />
              </button>
              <button
                className="lg:w-1/12 btn btn-sm btn-error rounded-l-none "
                type="button"
                onClick={removeClient}
              >
                <GrFormClose />
              </button>
            </div>
            <div className="form-control mb-2 flex justify-between w-full gap-2">
              <button className="btn btn-sm btn-primary ">create task</button>
              <button type="button" className="btn btn-sm btn-neutral">
                Clear Task
              </button>
            </div>
          </form>
          <br />
          <Table todos={todos} doneTodo={doneTodo} removeTodo={removeTodo} />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="lg:w-5/12 h-[80vh] max-h-[80vh] ">
          <TaskSummary todos={todos} />
        </div>
      </div>
      <div className=" w-full pb-2 bottom-0 grid place-items-center">
        <p className="text-xs">© 2023 • Made with ❤️ by Fernando Montallana</p>
      </div>
    </div>
  );
}

export default Todo;
