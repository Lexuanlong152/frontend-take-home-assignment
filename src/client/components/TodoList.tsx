import type { SVGProps } from 'react';
import type { Props } from '@/types/Props';
import type { Todo } from '@/types/Todo';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import * as Checkbox from '@radix-ui/react-checkbox';

import { api } from '@/utils/client/api';
import { STATUS } from '@/types/Status';

export const TodoList = ({ status }: Props) => {
  const apiContext = api.useContext();

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  });

  const { mutate: updateTodo } = api.todoStatus.update.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch();
    },
  });

  const { mutate: DeleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch();
    },
  });

  const [parentRef] = useAutoAnimate();

  const handleClickCheckBox = async (
    id: number,
    event: React.SyntheticEvent<EventTarget>
  ) => {
    const target = event.currentTarget as HTMLButtonElement;
    const ariaChecked = target.getAttribute('aria-checked');
    const status = ariaChecked === 'true' ? STATUS.Pending : STATUS.Completed;
    updateTodo({
      todoId: id,
      status: status,
    });
  };

  const handleDeleteTodo = (id: number) => {
    DeleteTodo({
      id: id,
    });
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (status === STATUS.Completed) {
      return todo.status === STATUS.Completed;
    }
    if (status === STATUS.Pending) {
      return todo.status === STATUS.Pending;
    }
    return true;
  });

  return (
    <div className="pt-8">
      <ul ref={parentRef} className="grid grid-cols-1 gap-y-3">
        {filteredTodos?.map((todo: Todo) => (
          <li key={todo.id}>
            <div className="flex justify-between rounded-12 border border-gray-200 px-2 py-3 shadow-sm">
              <div className="flex flex-row">
                <Checkbox.Root
                  id={String(todo.id)}
                  checked={todo.status === STATUS.Completed}
                  onClick={e => handleClickCheckBox(todo.id, e)}
                  className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="h-4 w-4 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <label
                  className={`block pl-3 font-medium ${
                    todo.status === STATUS.Completed ? 'line-through' : ''
                  }`}
                  htmlFor={String(todo.id)}
                >
                  {todo.body}
                </label>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="menu-trigger"
                aria-label="Menu"
              >
                <XMarkIcon className="text-red-500 h-6 w-6"></XMarkIcon>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};
