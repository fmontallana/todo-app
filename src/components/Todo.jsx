import React, { useEffect, useRef, useState } from "react";
import { GrFormAdd, GrFormClose } from "react-icons/gr";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getDayTime } from "../helpers/useGetDayTime";
import Table from "./Table";
import TaskSummary from "./TaskSummary";
import { toast } from "react-toastify";
import {
    AiFillCopyrightCircle,
    AiFillDelete,
    AiFillFileAdd,
    AiFillGithub,
} from "react-icons/ai";
import Counter from "./Counter";

function Todo() {
    const [todos, setTodos] = useLocalStorage("todos", []);
    const [counter, setCounter] = useLocalStorage("counter", 1);
    const [client, setClient] = useLocalStorage("client", ["ACCC", "BCA"]);
    const [todoInput, setTodoInput] = useState("");
    const [clientInput, setClientInput] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedTodo, setSelectedTodo] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [taskDoneCount, setTaskDoneCount] = useState(0);
    const [ongoingTaskCount, setOngoingTaskCount] = useState(0);

    const taskInputRef = useRef(null);
    const clientSelectRef = useRef(null);

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
            status: "",
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
                ? {
                      ...todo,
                      status: todo.status ? 0 : 1,
                      dateModified: new Date(),
                  }
                : todo
        );

        setTodos(newTodos);
    };

    const setToOngoing = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id
                ? { ...todo, status: 0, dateModified: new Date() }
                : todo
        );

        setTodos(newTodos);

        toast.success("Task is now on-ongoing!", {
            position: toast.POSITION.TOP_CENTER,
        });
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

    const editTodo = (todo) => {
        setIsEdit(true);
        setSelectedTodo(todo.id);
        setTodoInput(todo.todo);
        clientSelectRef.current.selectedIndex = client.indexOf(todo.client) + 1;
        setSelectedClient(todo.client);
        setClientInput(todo.client);
        console.log(client.indexOf(todo.client));
        console.log(clientSelectRef);
    };

    const saveTodo = () => {
        const editedTodo = {
            id: selectedTodo,
            todo: todoInput,
            client: selectedClient,
            status: "",
            dateModified: new Date(),
        };

        const newTodos = todos.map((todo) =>
            todo.id === selectedTodo ? { ...todo, ...editedTodo } : todo
        );

        setTodos(newTodos);
        setIsEdit(false);
        setTodoInput("");
        setClientInput("");
        clientSelectRef.current.selectedIndex = 0;

        toast.success("Edited task saved!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const handleCancelBtn = () => {
        setIsEdit(false);
        setTodoInput("");
        setTodoInput("");
        setClientInput("");
        clientSelectRef.current.selectedIndex = 0;
    };

    useEffect(() => {
        setTaskDoneCount(todos.filter((x) => x.status === 1).length);
        setOngoingTaskCount(todos.filter((x) => x.status === 0).length);
    }, [todos]);

    return (
        <div className="container mx-auto h-full">
            <div className="w-11/12 lg:w-full lg:h-[95dvh] mx-auto  py-6 flex flex-col lg:flex-row gap-8 ">
                <div className=" lg:w-1/12 flex lg:flex-col top-6 left-2 gap-2">
                    <Counter
                        name={"total"}
                        count={todos.length}
                        color={"badge-primary"}
                    />
                    <Counter
                        name={"ongoing"}
                        count={ongoingTaskCount}
                        color={"badge-primary"}
                    />
                    <Counter
                        name={"done"}
                        count={taskDoneCount}
                        color={"badge-primary"}
                    />
                </div>
                <div className="w-full lg:flex-1 rounded-box ">
                    <h1 className="text-lg font-bold">Task Manager</h1>
                    <br />
                    <form
                        className="flex flex-col w-full"
                        onSubmit={(e) => addTodo(e)}
                    >
                        <div className="form-control mb-2 flex justify-between w-full">
                            <input
                                className={`input input-sm input-bordered flex-1 ${
                                    isEdit && "border-slate-400"
                                }`}
                                type="text"
                                placeholder="Enter your task"
                                value={todoInput}
                                ref={taskInputRef}
                                onChange={(e) => setTodoInput(e.target.value)}
                            />
                        </div>
                        <div className=" mb-2 flex lg:justify-evenly w-full">
                            <select
                                className={`w-5/12 flex-1 select select-sm select-bordered rounded-r-none ${
                                    isEdit && "border-slate-400"
                                }`}
                                onChange={(e) => {
                                    setSelectedClient(e.target.value);
                                    setClientInput(e.target.value);
                                }}
                                ref={clientSelectRef}
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
                                className={`w-5/12 flex-1 input input-sm input-bordered rounded-none ${
                                    isEdit && "border-slate-400"
                                }`}
                                type="text"
                                placeholder="or add new"
                                value={clientInput}
                                onChange={(e) => setClientInput(e.target.value)}
                            />
                            <button
                                title="Add client"
                                className="lg:w-1/12 btn btn-sm btn-info rounded-l-none rounded-none "
                                type="button"
                                onClick={addClient}
                            >
                                <AiFillFileAdd />
                            </button>
                            <button
                                title="Remove client"
                                className="lg:w-1/12 btn btn-sm btn-error rounded-l-none "
                                type="button"
                                onClick={removeClient}
                            >
                                {/* <GrFormClose /> */}
                                <AiFillDelete />
                            </button>
                        </div>
                        <div className="form-control mb-2 flex justify-between w-full gap-2">
                            {!isEdit && (
                                <button className="btn btn-sm btn-primary ">
                                    add task
                                </button>
                            )}
                            {isEdit && (
                                <div className="flex w-full">
                                    <button
                                        type="button"
                                        className="flex-1 btn btn-sm btn-info rounded-r-none"
                                        onClick={saveTodo}
                                    >
                                        save
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 btn btn-sm btn-warning rounded-l-none"
                                        onClick={handleCancelBtn}
                                    >
                                        cancel
                                    </button>
                                </div>
                            )}
                            <div className="flex justify-evenly">
                                <button
                                    title="Delete task/s done"
                                    type="button"
                                    className="flex-1 btn btn-sm btn-neutral rounded-r-none border border-r-base-200"
                                    onClick={removeDoneTodos}
                                >
                                    <AiFillDelete /> Tasks done
                                </button>
                                <button
                                    title="Delete all task"
                                    type="button"
                                    className="flex-1 btn btn-sm btn-neutral rounded-l-none"
                                    onClick={() => {
                                        if (
                                            !confirm(
                                                "Are you sure to clear all tasks?"
                                            )
                                        )
                                            return;
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
                    <Table
                        todos={todos}
                        doneTodo={doneTodo}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        setToOngoing={setToOngoing}
                    />
                </div>

                {/* <div className=" divider divider-horizontal"></div> */}

                <div className=" lg:flex-1 h-[80vh] min-h-[80vh] max-h-[80vh] ">
                    <TaskSummary todos={todos} />
                </div>
            </div>
            <div className=" flex gap-2 pb-2 justify-center place-items-center text-xs">
                <p className="flex place-items-center gap-1">
                    <AiFillCopyrightCircle /> 2023 • Made with ❤️ by Fernando
                    Montallana • <AiFillGithub />{" "}
                    <a
                        href="https://github.com/fmontallana/todo-app"
                        target="_blank"
                    >
                        {" "}
                        Source
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Todo;
