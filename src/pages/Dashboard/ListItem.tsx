import { FC, lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";

import { Checkbox, CheckboxProps, List, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ITodo } from "../../interfaces/todo";
import { AppDispatch } from "../../redux/store";
import { deleteTodo, updateTodo } from "../../redux/action/todoActions";

// Dynamically import the EditTodo component
const EditTodo = lazy(() => import("./EditTodo"));

interface IListItem {
  todo: ITodo;
}

// Functional component to render each todo item in the list
const ListItem: FC<IListItem> = ({ todo }) => {
  const dispatch: AppDispatch = useDispatch(); // Get the dispatch function from Redux

  const [show, setShow] = useState(false);

  // Handler to toggle the completion status of the todo
  const toggleICompleted: CheckboxProps["onChange"] = (e) => {
    dispatch(updateTodo({ id: todo.id, updates: { isComplete: e.target.checked } }));
  };

  // Handler to delete the todo item
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // Render the title of the todo with a checkbox
  const renderTitle = () => {
    return (
      <Checkbox
        className={`${todo.isComplete ? "opacity-50" : ""}`}
        onChange={toggleICompleted}
        defaultChecked={todo.isComplete}
      >
        <span role="title" className={`todo-title ${todo.isComplete ? "line-through" : ""}`}>
          {todo.title}
        </span>
      </Checkbox>
    );
  };

  // Render action icons for editing and deleting the todo
  const renderAction = () => {
    return (
      <div className="flex gap-2">
        {!todo.isComplete && (
          <EditOutlined
            className="cursor-pointer text-blue-700 opacity-50 hover:opacity-90"
            onClick={() => setShow(true)}
            role="editBtn"
          />
        )}
        <Popconfirm title="Delete the todo?" onConfirm={handleDelete} okText="Yes" cancelText="No">
          <DeleteOutlined className="cursor-pointer text-red-600 opacity-50 hover:opacity-90" role="deleteBtn" />
        </Popconfirm>
      </div>
    );
  };

  // Render the title and action icons
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
