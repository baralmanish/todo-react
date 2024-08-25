import { List, notification } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ListItem from "./ListItem";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTodo } from "../../redux/action/todoActions";

const TodoList = () => {
  const [api, contextHolder] = notification.useNotification(); // Hook to manage notification API and context holder

  const dispatch: AppDispatch = useDispatch(); // Hook to access the dispatch function from Redux
  const { todo, status, error } = useSelector((state: RootState) => state.todo); // Retrieve the todo state from Redux store

  // Fetch todo when the component mounts or dispatch changes
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Show an error notification if there is an error in fetching todo
  useEffect(() => {
    if (error) {
      api.error({
        message: error
      });
    }
  }, [api, error]);

  // Render a message when there are no todo available
  const renderEmpty = () => <div style={{ textAlign: "center", padding: "20px" }}>No todo available</div>;

  return (
    <>
      {contextHolder}
      <div className="rounded-xl bg-white">
        <List
          bordered
          loading={Boolean(status)} // Show loading indicator based on status
          dataSource={todo} // Source of data for the list
          renderItem={(item) => <ListItem key={item.id} todo={item} />} // Render each item using ListItem component
          locale={{ emptyText: renderEmpty() }} // Display custom empty message when no todo are present
        />
      </div>
    </>
  );
};

export default TodoList;
