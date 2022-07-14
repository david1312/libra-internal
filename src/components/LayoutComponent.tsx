import moment from "moment";
import { useRecoilValue } from "recoil";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useStorage from "@/hooks/useStorage";

const { Header, Content, Sider } = Layout;

const LayoutComponent = (props: any) => {
  const { set, get } = useStorage();

  const profile = get("profile", []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "white",
          position: "fixed",
          zIndex: 5,
          width: "100%",
        }}
      >
        <div className="flex justify-between">
          <div>
            <NavLink to="/logout">
              <Button type="primary">LOGOUT</Button>
            </NavLink>
            <span className="mx-8">
              {moment().format("dddd, DD MMMM YYYY").toString()}
            </span>
          </div>
          <div className="flex">
            <div className="flex flex-col items-end">
              <p className="mx-4 my-0 leading-normal">
                {profile?.name} / {profile?.email}
              </p>
              <p className="mx-4 my-0 leading-normal italic">
                <span className="text-blue-500">CUSTOMER ID: </span>
                {profile?.cust_id}
              </p>
            </div>
            <div>
              <Avatar
                icon={<UserOutlined />}
                size={50}
                shape="circle"
                style={{ margin: 10 }}
              />
            </div>
          </div>
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          theme={"dark"}
          width={260}
          className="site-layout-background"
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            style={{
              height: "100%",
              borderRight: 0,
            }}
          >
            <Menu.Item key="1">
              <NavLink to="/">Overview</NavLink>
            </Menu.Item>
            <Menu.SubMenu key="sub1" title={"Pemesanan"}>
              <Menu.Item key="2">
                <NavLink to="/pemesanan/pemasangan">Pemasangan Ban</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" title={"List Barang"}>
              <Menu.Item key="3">
                <NavLink to="/list/brand-motor">Daftar Brand Motor</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to="/list/product">Daftar Product</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <div>
              <span
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 64,
                }}
              >
                {" "}
                PT. Libra Corporindo
              </span>
            </div>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 12px 12px",
            marginLeft: 260,
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 12,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
