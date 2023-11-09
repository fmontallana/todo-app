import React from "react";

function Counter({ name, count, color }) {
    return (
        <div className="w-full ">
            <button className="btn text-xs py-2 w-full h-full flex-col gap-0">
                <p>{name}</p>
                {/* <div className={`badge badge-lg ${color}`}>{count}</div> */}
                <h1 className="text-4xl font-black text-primary font-['Cairo']">
                    {count}
                </h1>
            </button>
        </div>
    );
}

export default Counter;
