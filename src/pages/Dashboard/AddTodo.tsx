import { useDispatch, useSelector } from "react-redux";
import { Form, Input, notification } from "antd";

import { ITodo } from "../../interfaces/todo";
import { addTodo } from "../../redux/action/todoActions";
import { AppDispatch, RootState } from "../../redux/store";

const AddTodoForm = () => {
  const [form] = Form.useForm(); // Initialize the Ant Design form
  const [api, contextHolder] = notification.useNotification(); // Initialize notification API for showing messages

  const dispatch: AppDispatch = useDispatch(); // Get the dispatch function from Redux
  const { status } = useSelector((state: RootState) => state.todo); // Get the current status from the Redux store

  // Handle form submission
  const onFinish = ({ title }: Partial<ITodo>) => {
    // Validate input
    if (!title) {
      api.error({
        message: "Error! Please input title to create a todo"
      });
      return;
    }
    // Dispatch the addTodo action to add the new todo
    dispatch(addTodo(title));

    // Reset the form fields
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div className="mb-5 rounded-xl bg-slate-950 p-3">
        <Form form={form} name="todo_add_form" onFinish={onFinish} autoComplete="off" disabled={status === "adding"}>
          <Form.Item noStyle name="title">
            <Input size="large" placeholder="Input todo and press enter to add" disabled={status === "adding"} />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddTodoForm;
