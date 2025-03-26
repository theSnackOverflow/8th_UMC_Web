import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Task } from "./types/Task";
import "./style.css";
import { useDarkMode } from "./context/DarkModeContext";

function App() {
  const{isDark, toggleDarkMode} = useDarkMode();

  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    const newTask: Task = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTask]);
  };

  const completeTask = (task: Task) => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div className={isDark ? 'dark' : ''}ß>
      <div className="todo-container">
        <button onClick={toggleDarkMode} className="dark-toggle">
          {isDark ? '🌙 다크모드' : '☀️ 라이트모드'}
        </button>
        <h1 className="todo-container__header">2ssac TODO</h1>
        <TodoInput onAdd={addTodo} />
        <div className="render-container">
          <TodoList title="할 일" tasks={todos} isDone={false} onClick={completeTask} />
          <TodoList title="완료" tasks={doneTasks} isDone={true} onClick={deleteTask} />
        </div>  
      </div>
    </div>
  );
}

export default App;