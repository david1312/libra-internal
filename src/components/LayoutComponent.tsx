import { useState } from "react";
import dayjs from "dayjs";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, Button, Layout, Menu, Modal, Card, MenuProps } from "antd";
import { HomeOutlined, ProjectOutlined, UserOutlined } from "@ant-design/icons";
import useStorage from "@/hooks/useStorage";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const LayoutComponent = (props: any) => {
  const { get } = useStorage();
  const { Meta } = Card;

  const location = useLocation();
  const selectedKeys = [location.pathname];
  const openKeys = "/" + location.pathname.split("/").slice(1, -1).join("/");
  const [detail, setDetail] = useState(false);

  const profile = get("profile", []);

  const items: MenuProps["items"] = [
    getItem(<NavLink to="/">Home</NavLink>, "item-1", <HomeOutlined />),

    getItem("Laporan", "item-2", <ProjectOutlined />, [
      getItem(
        <NavLink to="/reports/laba-rugi">Laba Rugi Seluruh Faktur</NavLink>,
        "item-2-sub-1"
      ),
      getItem(
        <NavLink to="/reports/faktur-rugi">Faktur Penjualan Rugi</NavLink>,
        "item-2-sub-2"
      ),
      getItem(
        <NavLink to="/admin-menu/">Update Fee Faktur Penjualan</NavLink>,
        "item-2-sub-3"
      ),
    ]),
    { type: "divider" },
  ];

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
              {dayjs().format("dddd, DD MMMM YYYY").toString()}
            </span>
          </div>
          <div className="flex">
            <div className="flex flex-col items-end">
              <p className="mx-4 my-0 leading-normal">
                {profile?.outlet_name} / {profile?.outlet_email}
              </p>
              <p className="mx-4 my-0 leading-normal italic">
                <span className="text-blue-500">ADDRESS: </span>
                {profile?.outlet_address}
              </p>
            </div>
            <div
              onClick={() => {
                setDetail(true);
              }}
            >
              <abbr title="Detail Merchant" style={{ cursor: "pointer" }}>
                <Avatar
                  src={profile?.outlet_avatar || ""}
                  icon={<UserOutlined />}
                  size={50}
                  shape="circle"
                  style={{ margin: 10 }}
                />
              </abbr>
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
            defaultSelectedKeys={[selectedKeys[0]]}
            defaultOpenKeys={[openKeys]}
            items={items}
          />
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
      <Modal
        title="Detail Merchant"
        open={detail}
        onCancel={() => setDetail(false)}
        footer={[
          <Button key="back" onClick={() => setDetail(false)}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={() => setDetail(false)}>
            Edit
          </Button>,
        ]}
      >
        <Card
          style={{ width: 450 }}
          bordered={false}
          className="profile-card text-left"
        >
          <Meta
            avatar={
              <Avatar
                src={profile?.outlet_avatar}
                size={100}
                shape="circle"
                style={{ margin: 10 }}
              />
            }
            description={
              <div className="mt-3">
                <p className="m-0 text-[#a70000] font-bold">
                  OUTLET {profile?.outlet_name}
                </p>
                <p className="m-0 text-black font-bold">
                  {profile?.outlet_address} / {profile?.outlet_city}
                </p>
                <p className="m-0 text-black">{profile?.outlet_email}</p>
                <p className="m-0 text-black">{profile?.outlet_cs_number}</p>
              </div>
            }
          />
        </Card>
      </Modal>
    </Layout>
  );
};

export default LayoutComponent;
