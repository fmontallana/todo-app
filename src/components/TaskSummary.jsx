import React from "react";
import { getDayTime } from "../helpers/useGetDayTime";

function TaskSummary({ todos }) {
  const clientList = todos.map((todo) => {
    return todo.client;
  });

  const filteredClients = [...new Set(clientList)];

  return (
    <div className="flex-1 h-full w-full p-4 lg:p-10 bg-base-200 rounded-lg overflow-y-auto">
      Good {getDayTime()} po! <br />
      {new Date().toLocaleString().split(",")[0]} <br />
      <p className="font-bold">TASKS</p>
      {todos.length <= 0 && <p>--- No available task ---</p>}
      {filteredClients.sort().map((client) => {
        return (
          <div key={client} className="mb-2">
            <h1 className="font-bold">{client}</h1>
            {todos.map((todo) => {
              if (todo.client !== client) return;
              return (
                <>
                  • {todo.todo} ({todo.status == 0 ? "ongoing" : "done"}) <br />
                </>
              );
            })}
            <br />
          </div>
        );
      })}
      <p>Thank you po.</p>
    </div>
  );
}

export default TaskSummary;
