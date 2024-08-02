import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

import { TodoList } from '@/client/components/TodoList';
import { CreateTodoForm } from '@/client/components/CreateTodoForm';
import { STATUS } from '@/types/Status';

const Index = () => {
  const [status, setStatus] = useState(STATUS.All);
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <div className="mt-10">
          <Tabs.Root
            defaultValue={STATUS.All}
            onValueChange={value => setStatus(value as STATUS)}
          >
            <Tabs.List className="mt-4 flex justify-start space-x-3">
              <Tabs.Trigger
                value={STATUS.All}
                className={`text-black rounded-full px-6  py-1.5 ${
                  status === STATUS.All
                    ? 'bg-gray-600 text-white'
                    : 'border border-gray-600 bg-white text-gray-800'
                }`}
              >
                All
              </Tabs.Trigger>
              <Tabs.Trigger
                value={STATUS.Pending}
                className={`text-black rounded-full px-6  py-1.5 ${
                  status === STATUS.Pending
                    ? 'bg-gray-600 text-white'
                    : 'border border-gray-600 bg-white text-gray-800'
                }`}
              >
                Pending
              </Tabs.Trigger>
              <Tabs.Trigger
                value={STATUS.Completed}
                className={`text-black rounded-full px-6  py-1.5 ${
                  status === STATUS.Completed
                    ? 'bg-gray-600 text-white'
                    : 'border border-gray-600 bg-white text-gray-800'
                }`}
              >
                Completed
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={STATUS.All}>
              <TodoList status={STATUS.All} />
            </Tabs.Content>
            <Tabs.Content value={STATUS.Completed}>
              <TodoList status={STATUS.Completed} />
            </Tabs.Content>
            <Tabs.Content value={STATUS.Pending}>
              <TodoList status={STATUS.Pending} />
            </Tabs.Content>
          </Tabs.Root>
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  );
};

export default Index;
