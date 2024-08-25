import { useDispatch, useSelector } from "react-redux";
import { Form, Input, notification } from "antd";

import { ITodo } from "../../interfaces/todo";
import { addTodo } from "../../redux/action/todoActions";
import { AppDispatch, RootState } from "../../redux/store";

const AddTodoForm = () => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { status } = useSelector((state: RootState) => state.todo);

  const onFinish = ({ title }: Partial<ITodo>) => {
    if (!title) {
      api.error({
        message: "Error! Please input title to create a todo"
      });
      return;
    }
    dispatch(addTodo(title));
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
