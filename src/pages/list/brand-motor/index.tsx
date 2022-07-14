import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Divider } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getMasterBrand } from "@/services/master";

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

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={dataMasterBrand}
          currentPage={1}
          pagination={true}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
