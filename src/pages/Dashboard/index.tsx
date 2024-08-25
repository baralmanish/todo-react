import Typography from "antd/es/typography";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Dashboard = () => {
  return (
    <div className="mx-auto w-96">
      <Typography.Title level={2} className="text-center">
        TODO
      </Typography.Title>

      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Dashboard;
