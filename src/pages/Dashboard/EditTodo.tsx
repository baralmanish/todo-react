import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import { ITodo } from "../../interfaces/todo";
import { AppDispatch, RootState } from "../../redux/store";
import { updateTodo } from "../../redux/action/todoActions";

interface IEditTodo {
  todo: ITodo;
  hideEdit: () => void;
}

const EditTodo: FC<IEditTodo> = ({ todo, hideEdit }) => {
  const [form] = Form.useForm(); // Initialize the Ant Design form
  const [api, contextHolder] = notification.useNotification(); // Initialize notification API for error messages

  const dispatch: AppDispatch = useDispatch(); // Get the dispatch function from Redux
  const { status } = useSelector((state: RootState) => state.todo); // Get the current status from the Redux store

  // Set the form field value when the todo prop changes
  useEffect(() => {
    form.setFieldValue("title", todo.title);
  }, [form, todo]);

  // Handle form submission
  const onFinish = ({ title }: Partial<ITodo>) => {
    // Validate input
    if (!title) {
      api.error({
        message: "Error! Please input title to create a todo"
      });
      return;
    }

    // Dispatch the updateTodo action
    dispatch(updateTodo({ id: todo.id, updates: { title } }));

    // Hide the edit form and reset the form fields
    hideEdit();
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div className="flex w-full gap-4">
        <Form
          form={form}
          className="flex-1"
          name="todo_edit_form"
          onFinish={onFinish}
          autoComplete="off"
          disabled={status === "updating"} // Disable form while updating
        >
          <Form.Item noStyle name="title">
            <Input placeholder="Title" disabled={status === "updating"} />
          </Form.Item>
        </Form>

        <CloseCircleOutlined onClick={hideEdit} className="text-red-600" />
      </div>
    </>
  );
};

export default EditTodo;
