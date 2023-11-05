import React from "react";

function TodoItem({ todo, removeTodo, doneTodo }) {
  const { id, todo: task, status, dateAdded, client } = todo;

  return (
    <div className="flex justify-between gap-2 mb-2">
      <div className="flex-1 flex gap-2">
        {/* <p className="mr-1">{id}</p> */}
        <input
          type="checkbox"
          checked="checked"
          className="checkbox"
          onChange={() => {}}
        />
        <p className="">{new Date(dateAdded).toLocaleString().split(",")[0]}</p>
        <p className="flex-1">{client}</p>
        <p className="flex-1">{task}</p>
        <p>{status == 0 ? "ongoing" : status == 1 ? "done" : null}</p>
      </div>
      <div className="flex justify-end place-items-start w-1/4">
        {/* <button className="btn btn-xs btn-primary" onClick={() => doneTodo(id)}>
          Done
        </button> */}
        <button
          className="btn btn-xs btn-secondary text-xs"
          onClick={() => removeTodo(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
