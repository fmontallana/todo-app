import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Table({ todos, removeTodo, doneTodo, editTodo }) {
  if (todos.length <= 0) return;

  return (
    <div className="max-h-80 overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th>Client</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr
                key={todo.id}
                className={`${todo.status ? "bg-base-200 line-through" : ""}`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={todo.status}
                    className="checkbox"
                    onChange={() => doneTodo(todo.id)}
                  />
                </td>
                <td>{todo.todo}</td>
                <td>{todo.client}</td>
                <td className="lg:w-3/12">
                  <button
                    className="btn btn-xs btn-info text-xs lg:rounded-r-none"
                    onClick={() => editTodo(todo)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="btn btn-xs btn-error text-xs lg:rounded-l-none"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
