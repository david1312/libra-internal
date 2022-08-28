import { useState } from "react";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, Button, Layout, Menu, Modal, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useStorage from "@/hooks/useStorage";
import Logo from "@/assets/logo.png";

const { Header, Content, Sider } = Layout;

const LayoutComponent = (props: any) => {
  const { set, get } = useStorage();
  const { Meta } = Card;

  const location = useLocation();
  const selectedKeys = [location.pathname];
  const openKeys = "/" + location.pathname.split("/").slice(1, -1).join("/");
  const [detail, setDetail] = useState(false);

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
          >
            <Menu.Item key="/">
              <NavLink to="/">Overview</NavLink>
            </Menu.Item>
            <Menu.SubMenu key="/pemesanan" title={"Pemesanan"}>
              <Menu.Item key="/pemesanan/pemasangan">
                <NavLink to="/pemesanan/pemasangan">Pemasangan Ban</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="/list" title={"List Barang"}>
              <Menu.Item key="/list/brand-motor">
                <NavLink to="/list/brand-motor">Daftar Brand Motor</NavLink>
              </Menu.Item>
              <Menu.Item key="/list/product">
                <NavLink to="/list/product">Daftar Product</NavLink>
              </Menu.Item>
              <Menu.Item key="/list/transactions">
                <NavLink to="/list/transactions">Daftar Transaksi</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <div>
              <span
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 54,
                }}
              >
                <img
                  width={24}
                  height={24}
                  alt={"Logo"}
                  src={Logo}
                  style={{ marginRight: "8px" }}
                />
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
      <Modal
        title="Detail Merchant"
        visible={detail}
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
