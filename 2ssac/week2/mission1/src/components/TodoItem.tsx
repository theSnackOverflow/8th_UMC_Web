import { Task } from "../types/Task";

type Props = {
  task: Task;
  isDone: boolean;
  onClick: (task: Task) => void;
};

const TodoItem = ({ task, isDone, onClick }: Props) => (
  <li className="render-container__item">
    <span className="render-container__item-text">{task.text}</span>
    <button
      className="render-container__item-button"
      onClick={() => onClick(task)}
    >
      {isDone ? "삭제" : "완료"}
    </button>
  </li>
);

export default TodoItem;