import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Alert, Button, Form, Input, Typography } from "antd";

import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/constants";
import { ILocation } from "../../interfaces/common";
import { IRegisterForm } from "../../interfaces/auth";
import { firstNameRules, lastNameRules, passwordRules, userNameRules } from "./validationRules";

const Register = () => {
  const currentUser = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location: ILocation = useLocation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

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

  const onFinish = async (values: IRegisterForm) => {
    setLoading(true);
    setError("");
    console.log(">>> onFinish values", values);
    // const response = await AuthService.login(values);
    // console.log(">>> onFinish response", response);
    navigate(`${URL.LOGIN}?newUser=1`);
    setLoading(false);
  };

  const renderForm = () => {
    return (
      <Form form={form} name="register_form" layout="vertical" onFinish={onFinish} autoComplete="off">
        {error && <Alert message={error} type="error" showIcon />}

        <Form.Item name="firstName" label="First Name" rules={firstNameRules}>
          <Input size="large" disabled={loading} />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={lastNameRules}>
          <Input size="large" disabled={loading} />
        </Form.Item>
        <Form.Item name="username" label="Username" rules={userNameRules}>
          <Input size="large" disabled={loading} />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input size="large" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              }
            })
          ]}
        >
          <Input size="large" disabled={loading} />
        </Form.Item>

        <Form.Item className="form-actions">
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block size="large">
            {loading ? "Please Wait..." : "Login"}
          </Button>
        </Form.Item>

        <div className="extra-actions">
          <Link to={URL.LOGIN}>Already Registered? Login</Link>
        </div>
      </Form>
    );
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-form">
        <div className="auth-form-header">
          <Typography.Title>Register</Typography.Title>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default Register;
