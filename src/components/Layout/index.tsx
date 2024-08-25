import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { URL } from "../../utils/constants";
import AuthService from "../../services/auth.service";

const { Content, Header, Footer } = Layout;

interface ILayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<ILayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    try {
      if (window.confirm("Are you sure you want to logout?")) {
        AuthService.logout();
        navigate(URL.LOGIN);
      }
    } catch (err: unknown) {
      console.log("error logging out: " + err);
    }
  };

  return (
    <Layout className="min-h-[100dvh]">
      <Header className="sticky top-0 z-[1] flex h-16 w-full items-center justify-between">
        <div className="text-xl font-semibold text-white">TODO APP</div>
        <div onClick={() => logout()} className="cursor-pointer text-red-500 hover:underline">
          <LogoutOutlined /> Logout
        </div>
      </Header>
      <Content className="px-12 py-6">{children}</Content>
      <Footer className="text-center">TODO APP ©{new Date().getFullYear()} Created by Manish Baral</Footer>
    </Layout>
  );
};

export default AppLayout;
