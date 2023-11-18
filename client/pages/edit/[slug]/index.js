import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EditTask() {
  const [task, setTask] = useState();
  const [newTaskName, setNewTaskName] = useState();
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedRadio, setCompletedRadio] = useState();

  const router = useRouter();
  const { _id } = router.query;

  const fetchSingleTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/v1/tasks/${_id}`
      );
      const {
        data: { task: re },
      } = response;
      setTask(re);
      setCompletedRadio(re.completed);
      console.log("🚀 ~ file: index.js:21 ~ fetchSingleTask ~ re:", re);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:23 ~ fetchSingleTask ~ error:",
        error.message
      );
    }
  };

  const handleEdit = async () => {
    try {
      if (newTaskName === "") return;
      const response = await axios.patch(
        `http://localhost:7000/api/v1/tasks/${_id}`,
        {
          name: newTaskName,
          completed: completedRadio,
        }
      );
      console.log("🚀 ~ file: index.js:42 ~ handleEdit ~ response:", response);
      if (response.status === 200) {
        setMessage("Edit Successful!!!🥳🥳🥳");
        setIsSuccess(true);
        fetchSingleTask();
      } else {
        setMessage("Failed to edit task.😪🥲😓");
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:34 ~ handleEdit ~ error:",
        error.message
      );
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleRadioChange = (e) => {
    setCompletedRadio(e.target.value);
  };

  useEffect(() => {
    if (_id) {
      fetchSingleTask();
    }
  }, [_id]);

  setTimeout(() => setMessage(""), 5000);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-1/2">
          <h1 className="text-lg font-bold mb-4">Edit Task</h1>
          {task && (
            <>
              <input
                type="text"
                placeholder={task.name}
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-4"
              />
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="completedStatus"
                    value={true}
                    onChange={handleRadioChange}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 text-gray-700">Completed</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="completedStatus"
                    value={false}
                    onChange={handleRadioChange}
                    className="form-radio h-5 w-5 text-red-600"
                  />
                  <span className="ml-2 text-gray-700">Not Completed</span>
                </label>
              </div>
              <p
                className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                  isSuccess
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                {message}
              </p>
              <button
                onClick={handleEdit}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mb-4">
                Save
              </button>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">Task Name: {task.name}</p>
                <p className="text-gray-700">
                  Completed: {task.completed ? "Completed" : "Not Completed"}
                </p>
              </div>
              <button
                onClick={handleBack}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block">
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
