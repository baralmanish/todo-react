import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Alert, Button, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/constants";
import { ILoginForm } from "../../interfaces/auth";
import { ILocation } from "../../interfaces/common";
// import AuthService from "../../services/auth.service";

import "./style.scss";

const Login = () => {
  const currentUser = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location: ILocation = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  console.log(">>> searchParams", searchParams.get("newUser"));

  useEffect(() => {
    // if the user is already logged in, no need to do it again
    if (currentUser) {
      setRedirectToReferrer(true);
    }
  }, [currentUser]);

  if (redirectToReferrer) {
    let redirectUrl = null;
    if (typeof location.state == "string") {
      const state = JSON.parse(location.state);
      redirectUrl = state?.from;
    }

    return <Navigate to={redirectUrl || URL.DASHBOARD} replace />;
  }

  const onFinish = async (values: ILoginForm) => {
    setSearchParams((params) => {
      params.delete("newUser");
      return params;
    });

    setLoading(true);
    setError("");
    console.log(">>> onFinish values", values);
    // const response = await AuthService.login(values);
    // console.log(">>> onFinish response", response);
    navigate(URL.DASHBOARD);
    setLoading(false);
  };

  const renderForm = () => {
    return (
      <Form form={form} name="login_form" layout="vertical" onFinish={onFinish} autoComplete="off">
        {error && <Alert message={error} type="error" showIcon />}
        {searchParams.get("newUser") && <Alert message="Account Created. Please Login" type="success" showIcon />}

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input username"
            }
          ]}
        >
          <Input
            size="large"
            disabled={loading}
            placeholder="Username"
            autoComplete="username"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password"
            }
          ]}
        >
          <Input.Password
            size="large"
            disabled={loading}
            placeholder="Password"
            prefix={<LockOutlined />}
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item className="form-actions">
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block size="large">
            {loading ? "Please Wait..." : "Login"}
          </Button>
        </Form.Item>

        <div className="extra-actions">
          <Link to={URL.REGISTER}>New User? Register</Link>
        </div>
      </Form>
    );
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-form">
        <div className="auth-form-header">
          <Typography.Title>Login</Typography.Title>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default Login;
