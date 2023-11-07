import React, { useEffect, useState } from "react";
import { GrFormAdd, GrFormClose } from "react-icons/gr";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getDayTime } from "../helpers/useGetDayTime";
import Table from "./Table";
import TaskSummary from "./TaskSummary";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillFileAdd } from "react-icons/ai";

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

    setTodos([newTodo, ...todos]);
    setCounter((prev) => prev + 1);
    toast.success("Task added!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const removeTodo = (id) => {
    if (!confirm("Are you sure?")) return;

    const newTodos = todos.filter((todos) => todos.id != id);
    setTodos(newTodos);
    toast.success("Task removed!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const removeDoneTodos = () => {
    const isCompleted = todos.filter((item) => item.status === 1);
    if (isCompleted.length == 0) {
      toast.warn("No task done!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!confirm("Are you sure?")) return;
    const newTodos = todos.filter((todos) => todos.status != 1);
    setTodos(newTodos);
    toast.success("Tasks done removed!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status ? 0 : 1, dateModified: new Date() }
        : todo
    );

    setTodos(newTodos);
  };

  const addClient = () => {
    if (clientInput === "") {
      toast.warn("Please enter client name.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const isAdded = client.find(
      (value) => value.toLowerCase() == clientInput.toLowerCase()
    );

    if (isAdded) {
      toast.warn("Client name already in the list.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    setClientInput("");
    setClient((prev) => [...prev, clientInput]);
    toast.success("Client added!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const removeClient = () => {
    if (selectedClient === "") return;
    const newClient = client.filter((item, index) => item !== clientInput);
    setClient(newClient);
    setClientInput("");
    toast.success("Client remove!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className=" h-full">
      <div className="w-11/12  lg:w-10/12 mx-auto py-6 flex flex-col lg:flex-row gap-10">
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
                {client.sort().map((client, index) => {
                  if (client === "") return;
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
                <AiFillFileAdd />
              </button>
              <button
                className="lg:w-1/12 btn btn-sm btn-error rounded-l-none "
                type="button"
                onClick={removeClient}
              >
                {/* <GrFormClose /> */}
                <AiFillDelete />
              </button>
            </div>
            <div className="form-control mb-2 flex justify-between w-full gap-2">
              <button className="btn btn-sm btn-primary ">add task</button>
              <div className="flex justify-evenly">
                <button
                  type="button"
                  className="flex-1 btn btn-sm btn-neutral rounded-r-none border border-r-base-200"
                  onClick={removeDoneTodos}
                >
                  <AiFillDelete /> Tasks done
                </button>
                <button
                  type="button"
                  className="flex-1 btn btn-sm btn-neutral rounded-l-none"
                  onClick={() => {
                    if (!confirm("Are you sure to clear all tasks?")) return;
                    setTodos([]);
                    toast.success("All task removed!", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }}
                >
                  <AiFillDelete /> All
                </button>
              </div>
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
