import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });
  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码一致"));
      return;
    }
    run(login(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary" loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
