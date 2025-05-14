import React, { useState, useEffect } from "react";
import { supabase } from "../SupaBase.js";

function TaskM({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [newDesc, setNewDesc] = useState();
  const [taskImage, setTaskImage] = useState(null);

  async function fetchTasks() {
    const { error, data } = await supabase
      .from("tasks1")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error Fetching Data :: ", error.message);
      return;
    }
    setTasks(data);
  }

  async function uploadImage(file) {
    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("images-bucket")
      .upload(filePath, file);

    if (error) {
      console.log("Error uploading image ::", error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("images-bucket")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  function imageHandler(e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  }


  // adding tasks
  async function handleSubmit(e) {
    e.preventDefault();

    let image_url = "";
    if (taskImage) {
      image_url = await uploadImage(taskImage);
    }

    const { error } = await supabase
      .from("tasks1")
      .insert({ ...newTask, email: session.user.email, image_url: image_url })
      .select("*")
      .single();
    if (error) {
      console.log("Error adding task ::", error.message);
    }
    // setTasks((prev) => [...prev, data]);
    setNewTask({ title: "", description: "" });
  }

  async function deleteTask(id) {
    const { error } = await supabase.from("tasks1").delete().eq("id", id);
    if (error) {
      console.log("Error deleting task ::", error.message);
      return;
    }
  }

  async function updateTask(id, description) {
    const { error } = await supabase
      .from("tasks1")
      .update({ description })
      .eq("id", id);
    if (error) {
      console.log("Error Updating task ::", error.message);
      return;
    }
  }

  //   to fetch all task on reload
  useEffect(() => {
    fetchTasks();
  }, []);

  // to get real time tasks (if added)
  useEffect(() => {
    const channel = supabase.channel("public:tasks1");

    channel
      .on(
        "broadcast",
        { event: "INSERT", schema: "public", table: "tasks1" },
        (payload) => {
          console.log("Cursor position received!", payload);
          const newTask = payload.new;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscription: ", status);
        }
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 items-start font-sans ">
      {/* render tasks  */}
      <div className=" flex flex-col fixed top-20 left-10 h-[80vh] w-[400px] overflow-y-auto p-4 shadow rounded scrollbar-hide border-r-[0.5px] ml-15 scroll-behavior: smooth ">
        <ul className="flex flex-col gap-4 pr-14">
          {tasks.map((task) => (
            // <li
            //   className="border border-[#ccc] rounded-sm p-[10px]"
            //   key={task.id}
            // >
            //   <h1>{task.title}</h1>
            //   <p>{task.description}</p>
            //   <img src={task.image_url} alt="" />
            //   <textarea
            //     placeholder="edit description..."
            //     className="border px-2 h-[50px] p-[10px]"
            //     onChange={(e) =>
            //       setNewDesc((prev) => ({ ...prev, [task.id]: e.target.value }))
            //     }
            //   />
            //   <div className="flex gap-2">
            //     <button onClick={() => updateTask(task.id, newDesc[task.id])}>
            //       update
            //     </button>
            //     <button onClick={() => deleteTask(task.id)}>delete</button>
            //   </div>
            // </li>
            <li
  className="border border-[#ccc] rounded-sm p-[10px]"
  key={task.id}
>
  <h1>{task.title}</h1>
  <p>{task.description}</p>
  {task.image_url && (
    <img
      src={task.image_url}
      alt="task"
      className="w-full max-h-48 object-cover mt-2 rounded"
    />
  )}
  <textarea
    placeholder="edit description..."
    className="border px-2 h-[50px] p-[10px] mt-2"
    onChange={(e) =>
      setNewDesc((prev) => ({ ...prev, [task.id]: e.target.value }))
    }
  />
  <div className="flex gap-2 mt-2">
    <button onClick={() => updateTask(task.id, newDesc[task.id])}
        className="px-1 py-1 border rounded-md">
      update
    </button>
    <button onClick={() => deleteTask(task.id)}
        className="px-1 py-1 border rounded-md">
        delete</button>
  </div>
</li>

          ))}
        </ul>
      </div>

      {/* input tasks */}
      <div className="flex flex-col justify-center items-center md:ml-[420px] gap-4 mb-10 w-full max-w-md">
        <h2>Task Manager</h2>
        <input
          type="text"
          placeholder="Title"
          className="border-[0.5px] border-gray-50 px-6 py-3 w-full"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          type="text"
          placeholder="Description"
          className="border-[0.5px] border-gray-50 px-6 py-[6px] w-full"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <input
          type="file"
          accept="image/*"
          className="border-[0.5px] border-gray-50 px-3 py-3 "
          onChange={imageHandler}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>

      {/* main div */}
    </div>
  );
}

export default TaskM;
