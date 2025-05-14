import React from "react";
import { supabase } from "../SupaBase.js";

function Ntask({ session }) {
  return (
    <div className="flex flex-row justify-between gap-10 items-start font-sans">
      <div className="hidden md:flex flex-col fixed top-20 left-10 h-[80vh] w-[400px] overflow-y-auto p-4 shadow rounded scrollbar-hide border-r">
        <ul className="flex flex-col gap-4 pr-4">
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
          <li className="border border-[#ccc] rounded-sm p-[10px]">
            <h1>title</h1>
            <p>description</p>
            <img src="" alt="" />
            <textarea placeholder="edit description..."></textarea>
            <div className="flex gap-2">
              <button>update</button>
              <button>delete</button>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center md:ml-auto gap-4 mb-10 mt-20 md:mt-0 w-full md:w-auto px-4 md:px-0">
        <input
          type="text"
          placeholder="Title"
          className="border-[0.5px] border-gray-50 px-6 py-3 w-full md:w-auto"
        />
        <textarea
          type="text"
          placeholder="Description"
          className="border-[0.5px] border-gray-50 px-6 py-3 w-full md:w-auto"
        />
      </div>
    </div>
  );
}

export default Ntask;