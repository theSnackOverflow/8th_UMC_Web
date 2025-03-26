import {useState} from 'react';

type Props = {
    onAdd: (text: string) => void;
  };
  
  const TodoInput = ({ onAdd }: Props) => {
    const [input, setInput] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        onAdd(input);
        setInput("");
      }
    };
  
    return (
      <form className="todo-container__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-container__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일 입력"
          required
        />
        <button className="todo-container__button" type="submit">
          할 일 추가
        </button>
      </form>
    );
  };
  
  export default TodoInput;