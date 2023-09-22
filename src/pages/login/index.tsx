import LoginBackground from "@/components/background/LoginBackground";
import withUnProtectedPage from "@/components/hocs/withUnProctectedPage";
import { Button, Card, Form, Input, Layout } from "antd";
import { useAction } from "./_action";
import Logo from "@/assets/logo2022.png";
import { CopyrightOutlined } from "@ant-design/icons";

function LoginPage() {
  const { onFinish, loading } = useAction();
  return (
    <div>
      <LoginBackground />
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ maxWidth: 480, width: "100%", borderRadius: 15 }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <img width={240} height={240} alt={"Logo"} src={Logo} />
            </span>
            <Form onFinish={onFinish}>
              Username
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
              Password
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ backgroundColor: "#FAA21B", color: "#fff" }}
                  shape="round"
                  loading={loading}
                  htmlType="submit"
                  size="large"
                  block
                  className="login-button"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FAA21B",
              }}
            >
              <CopyrightOutlined /> &nbsp; PT. LIBRA CORPORINDO INVESTAMA
            </span>
          </Card>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default withUnProtectedPage(LoginPage);
