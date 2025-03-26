import { Task } from "../types/Task";
import TodoItem from "./TodoItem";

type Props = {
  title: string;
  tasks: Task[];
  isDone: boolean;
  onClick: (task: Task) => void;
};

const TodoList = ({ title, tasks, isDone, onClick }: Props) => (
  <div className="render-container__section">
    <h2 className="render-container__title">{title}</h2>
    <ul className="render-container__list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          isDone={isDone}
          onClick={onClick}
        />
      ))}
    </ul>
  </div>
);

export default TodoList;