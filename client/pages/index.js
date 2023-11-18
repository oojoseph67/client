import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  console.log("🚀 ~ file: index.js:9 ~ Home ~ newTask:", newTask);
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState(true);

  const editTask = (_id, name) => {
    router.push({
      pathname: `/edit/${name}/`,
      query: { _id },
    });
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1/tasks");
      const {
        data: { tasks: re },
      } = response;
      setTasks(re);
      console.log("🚀 ~ file: index.js:18 ~ fetchTasks ~ re:", re);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:21 ~ fetchTasks ~ error:",
        error.message
      );
    }
  };

  const handleCreate = async () => {
    try {
      if (newTask === "") return;
      const response = await axios.post(`http://localhost:7000/api/v1/tasks`, {
        name: newTask,
        // completed: completedRadio,
      });
      console.log(
        "🚀 ~ file: index.js:46 ~ handleCreate ~ response:",
        response
      );
      if (response.status === 201) {
        setMessage("Create Successful!!!🥳🥳🥳");
        setIsSuccess(true);
        setNewTask("")
        fetchTasks();
      } else {
        setMessage("Failed to create task.😪🥲😓");
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:55 ~ handleCreate ~ error:",
        error.message
      );
    }
  };

  const handleDelete = async (_id) => {
    try {
      if (!_id) return;
      const response = await axios.delete(
        `http://localhost:7000/api/v1/tasks/${_id}`
      );

      console.log(
        "🚀 ~ file: index.js:66 ~ handleDelete ~ response:",
        response
      );
      if (response.status === 200) {
        setMessage("Delete Successful!!!🥳🥳🥳");
        setIsSuccess(true);
        fetchTasks();
      } else {
        setMessage("Failed to delete task.😪🥲😓");
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:76 ~ handleDelete ~ error:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  setTimeout(() => setMessage(""), 10000);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-1/2">
          <h1 className="text-lg font-bold mb-4">Task Manager</h1>
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="e.g. wash dishes"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            />
            <button
              onClick={handleCreate}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Submit
            </button>
            <div
              className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {message}
            </div>
          </div>
          <ul>
            {tasks.map((task, index) => {
              const { _id, name, completed } = task;
              return (
                <li key={index} className="flex mb-4 items-center">
                  <p className="w-full text-grey-darker">{name}</p>
                  <button
                    onClick={(e) => {
                      editTask(_id, name);
                    }}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(_id)
                    }}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
