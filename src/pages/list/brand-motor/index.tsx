import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Divider, Button } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getMasterBrand } from "@/services/master";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "NAME",
    dataIndex: "nama",
    key: "nama",
  },
  {
    title: "LOGO",
    dataIndex: "icon",
    key: "icon",
    align: "center",
    render: (_: any, record: any) => (
      <>
        <img width="81px" src={record?.icon}></img>
      </>
    ),
  },
];

const BrandBan = () => {
  const { dataMasterBrand } = getMasterBrand();
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor">Daftar Brand Motor</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />
      <table width={"100%"}>
        <tr>
          <td>
            <span style={{ float: "right" }}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate(currentPath + "/form  ")}
              >
                Add New Brand
              </Button>
            </span>
          </td>
        </tr>
      </table>

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={dataMasterBrand}
          pagination={true}
          onChange={(e: any, i: any) => {}}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
