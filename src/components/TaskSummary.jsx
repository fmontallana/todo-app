import React, { useEffect, useRef, useState } from "react";
import { getDayTime } from "../helpers/useGetDayTime";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import { AiFillCopy, AiFillEdit } from "react-icons/ai";

function TaskSummary({ todos }) {
  const [value, copy] = useCopyToClipboard();
  const [isEditable, setIsEditable] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const copyDIV = useRef(null);

  const clientList = todos.map((todo) => {
    return todo.client;
  });

  const filteredClients = [...new Set(clientList)];

  const copyText = () => {
    setIsCopied(true);
    setCurrentColor("text-yellow-500");

    const text = copyDIV.current?.innerText;
    copy(text);
    toast("Text copied!", {
      position: toast.POSITION.TOP_CENTER,
    });

    setTimeout(() => {
      setCurrentColor("");
      isCopied(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row justify-end gap-2 mb-4">
        <h1 className="flex-1 text-lg font-bold float-left">
          Generated Task Format
        </h1>
        <button className="btn btn-sm btn-info" onClick={copyText}>
          <AiFillCopy />
          Copy
        </button>
        <button
          className={`btn btn-sm  ${isEditable ? "btn-accent" : "btn-neutral"}`}
          onClick={() => setIsEditable(!isEditable)}
        >
          <AiFillEdit /> Edit
        </button>
      </div>
      <div
        id="textToCopy"
        className="flex justify-start place-items-start gap-2 flex-1 max-h-[80vh] w-full p-4 lg:px-6 bg-base-200 rounded-lg overflow-y-auto"
      >
        <div
          ref={copyDIV}
          contentEditable={isEditable}
          className={`flex-1 ${isEditable && "text-slate-100"} ${currentColor}`}
        >
          Good {getDayTime()} po! <br />
          {new Date().toLocaleString().split(",")[0]}
          <p className="font-bold">TASKS</p>
          {todos.length <= 0 && <p>--- No available task ---</p>}
          {filteredClients.sort().map((client) => {
            return (
              <div key={client} className="mb-2">
                <h1 className="font-bold">{client}</h1>
                {todos
                  .sort((a, b) => a.id - b.id)
                  .map((todo) => {
                    if (todo.client !== client) return;
                    return (
                      <>
                        • {todo.todo}{" "}
                        {todo.status === 0
                          ? "(on-going)"
                          : todo.status === 1
                          ? "(done)"
                          : ""}
                        <br />
                      </>
                    );
                  })}
              </div>
            );
          })}
          Thank you po.
        </div>
      </div>
    </div>
  );
}

export default TaskSummary;
