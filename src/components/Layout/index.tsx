import { FC } from "react";

import { Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import AuthService from "../../services/auth.service";

const { Content, Header, Footer } = Layout;

interface ILayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<ILayoutProps> = ({ children }) => {
  const logout = () => {
    try {
      if (window.confirm("Are you sure you want to logout?")) {
        AuthService.logout();
        // Navigate to login page instead of reloading the page
        window.location.href = "/login";
      }
    } catch (err: unknown) {
      console.log("error logging out: " + err);
    }
  };

  return (
    <Layout className="min-h-[100dvh]">
      <Header className="sticky top-0 z-[1] flex h-16 w-full items-center justify-between">
        <div className="text-xl font-semibold text-white" role="appLogo">
          TODO APP
        </div>
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
