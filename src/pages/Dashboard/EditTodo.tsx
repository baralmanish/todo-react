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
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { status } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    form.setFieldValue("title", todo.title);
  }, [form, todo]);

  const onFinish = ({ title }: Partial<ITodo>) => {
    if (!title) {
      api.error({
        message: "Error! Please input title to create a todo"
      });
      return;
    }
    dispatch(updateTodo({ id: todo.id, updates: { title } }));
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
          disabled={status === "updating"}
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
