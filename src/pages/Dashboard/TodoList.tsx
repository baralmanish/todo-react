import { List, notification } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ListItem from "./ListItem";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTodo } from "../../redux/action/todoActions";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { todo, status, error } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      api.error({
        message: error
      });
    }
  }, [api, error]);

  return (
    <>
      {contextHolder}
      <div className="rounded-xl bg-white">
        <List bordered loading={Boolean(status)} dataSource={todo} renderItem={(item) => <ListItem todo={item} />} />
      </div>
    </>
  );
};

export default TodoList;
