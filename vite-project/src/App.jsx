import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaSun, FaEye, FaEdit, FaTrash, FaMoon } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  //dark mode
  const [isDark, setISDark] = useState(() => {
    return localStorage.getItem(" darkMode ") === "true";
  });

  //todos
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  //edit todo
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  //model
  const [showModel, setShowModel] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");

  //dave todo
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  //add
  const addTodo = () => {
    if (text.trim() === "") {
      toast.error("Please enter a task");
      return;
    }
    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? { ...t, text } : t)));
      toast.success("Task updated successfully");
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text }]);
      toast.success("Task added successfully");
    }
    setText("");
  };
  //delete
  const deletetodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    toast.error("Task deleted");
  };

  //edit
  const editTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  }

  //view
  const viewTodo = (todo) => {
    setSelectedTodo(todo);
    setShowModel(true);
  };

  return (
    <div>
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <motion.div
          intial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-xl rounded-2xl shadow-xl p-6 bg-gray-800 text-white ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
        >

          {/*header*/}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold tracking-wide">
              MY TODO LIST
            </h1>
            {/* <FaSun className="text-lg cursor-pointer" /> */}
            <button onClick={() => setISDark(!isDark)} className="text-lg">{isDark ? <FaSun /> : <FaMoon />}</button>
          </div>
          {/* top bar */}
          <div className="flex justify-between items-center mb-5">
            <span className="bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm">TODO</span>
            <span className="text-sm bg-gray-700 px-3 py-1 rounded-md text-gray-300">All</span>
          </div>
          {/* input data */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your task..."
              className={`flex-1 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:border-indigo-500 ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`}
            />
            <button onClick={addTodo}
              className=" bg-indigo-500 text-white px-4 rounded-md hover:bg-indigo-600">
              {editId ? "Update" : "Add"}
            </button>
          </div>

          {/* todolist */}
          <div className="space-y-3">
            {todos.map((t) => (
              <motion.div
                initial={{ opacity: 0, y: 0.95 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-gray-700 p-4 border border-gray-600 rounded-lg">

                <div>
                  <p className="text-sm font-medium">{t.text}</p>
                  <span className="text-xs text-gray-400">Task added</span>
                </div>
                <div className="flex gap-4 text-lg">
                  <FaEye onClick={() => viewTodo(t)} className="text-gray-400 hover:text-gray-500 cursor-pointer" />
                  <FaEdit onClick={() => editTodo(t)} className="text-gray-400 hover:text-gray-500 cursor-pointer" />
                  <FaTrash onClick={() => deletetodo(t.id)} className="text-gray-400 hover:text-gray-500 cursor-pointer" />
                </div>
              </motion.div>

            ))}

          </div>
          <ToastContainer Position="top-right" autoClose={2000} />
        </motion.div>

        {/* model design */}
        {showModel && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0.8, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-80 rounded-lg p-6 bg-gray-800 text-white ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="font-semibold mb-2">Model Content</h3>
              <p className="mb-4">
                {selectedTodo.text}
              </p>
              <button
                onClick={() => setShowModel(false)}
                className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}


      </div>
    </div>
  );
};

export default App