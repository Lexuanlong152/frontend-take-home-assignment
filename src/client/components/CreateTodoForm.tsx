import { useState } from 'react';

import { api } from '@/utils/client/api';

export const CreateTodoForm = () => {
  const [todoBody, setTodoBody] = useState('');

  const apiContext = api.useContext();

  const { mutate: createTodo, isLoading: isCreatingTodo } =
    api.todo.create.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch();
      },
    });

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await createTodo({
        body: todoBody,
      });
      setTodoBody('');
    }
  };
  const handleClickAddTodo = () => {
    createTodo({
      body: todoBody,
    });
    setTodoBody('');
  };

  return (
    <form className="group flex items-center justify-between rounded-12 border border-gray-200 py-2 pr-4 focus-within:border-gray-400">
      <label htmlFor={TODO_INPUT_ID} className="sr-only">
        Add todo
      </label>

      <input
        id={TODO_INPUT_ID}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Add todo"
        value={todoBody}
        onChange={e => {
          setTodoBody(e.target.value);
        }}
        className="flex-1 px-4 text-base placeholder:text-gray-400 focus:outline-none"
      />

      <button
        className=" rounded-full border-2 border-gray-600 bg-gray-600 px-4 py-1 text-gray-100"
        type="button"
        disabled={isCreatingTodo}
        onClick={handleClickAddTodo}
      >
        Add
      </button>
    </form>
  );
};

const TODO_INPUT_ID = 'todo-input-id';
