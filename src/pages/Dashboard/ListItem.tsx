import { FC, lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";

import { Checkbox, CheckboxProps, List, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ITodo } from "../../interfaces/todo";
import { AppDispatch } from "../../redux/store";
import { deleteTodo, updateTodo } from "../../redux/action/todoActions";

const EditTodo = lazy(() => import("./EditTodo"));

interface IListItem {
  todo: ITodo;
}

const ListItem: FC<IListItem> = ({ todo }) => {
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);

  const toggleICompleted: CheckboxProps["onChange"] = (e) => {
    dispatch(updateTodo({ id: todo.id, updates: { isComplete: e.target.checked } }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const renderTitle = () => {
    return (
      <Checkbox
        className={`${todo.isComplete ? "opacity-50" : ""}`}
        onChange={toggleICompleted}
        defaultChecked={todo.isComplete}
      >
        <span className={`${todo.isComplete ? "line-through" : ""}`}>{todo.title}</span>
      </Checkbox>
    );
  };

  const renderAction = () => {
    return (
      <div className="flex gap-2">
        {!todo.isComplete && (
          <EditOutlined
            className="cursor-pointer text-blue-700 opacity-50 hover:opacity-90"
            onClick={() => setShow(true)}
          />
        )}
        <Popconfirm title="Delete the todo?" onConfirm={handleDelete} okText="Yes" cancelText="No">
          <DeleteOutlined className="cursor-pointer text-red-600 opacity-50 hover:opacity-90" />
        </Popconfirm>
      </div>
    );
  };

  const renderData = () => {
    return (
      <>
        {renderTitle()}
        {renderAction()}
      </>
    );
  };

  return (
    <List.Item>
      {show ? (
        <Suspense>
          <EditTodo todo={todo} hideEdit={() => setShow(false)} />
        </Suspense>
      ) : (
        renderData()
      )}
    </List.Item>
  );
};

export default ListItem;
