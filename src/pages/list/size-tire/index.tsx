import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Divider, Button } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getMasterTireSize } from "@/services/master";
const columns = [
  {
    title: "NO",
    dataIndex: "no",
    key: "no",
    width: 50,
  },
  {
    title: "RING BAN",
    dataIndex: "ring_ban",
    key: "ring_ban",
    width: 100,
  },
  {
    title: "LIST UKURAN",
    dataIndex: "list_ukuran",
    key: "list_ukuran",
    render: (_: any, record: any) => (
      <>
        {record?.list_ukuran?.map((e: any) => {
          return (
            <Button style={{ width: 115, marginRight: 8 }}>{e.ukuran}</Button>
          );
        })}
      </>
    ),
  },
];

const BrandBan = () => {
  const { dataTireSize } = getMasterTireSize();
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

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={dataTireSize?.map((e: any, i: number) => ({ ...e, no: i + 1 }))}
          pagination={true}
          onChange={(e: any, i: any) => {}}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
