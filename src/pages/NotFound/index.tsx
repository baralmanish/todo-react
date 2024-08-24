import { FC } from "react";
import { Link } from "react-router-dom";

import { Result } from "antd";

import "./style.scss";

export const NotFound: FC = () => {
  return (
    <div className="not-found-page">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/" className="ant-btn ant-btn-primary">
            Back Home
          </Link>
        }
      />
    </div>
  );
};
