import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Col, Divider, Space, Tag } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getListTransactions } from "@/services/transactions";
// import {
//   FieldTimeOutlined,
//   LoadingOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const ListTransactions = () => {
  const [listTransactions, setListTransactions] = useState<any>([]);

  //   const { dataTransactions, isLoading } = getTransactions();
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const breadCumbLabaRugi = [
    {
      title: "Laporan",
    },
    {
      title: "Laporan Laba Rugi",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const onFetch = async (limit?: any, page?: any) => {
    const payload = {
      limit: limit || 1000,
      page: page || 1,
      trans_status: [
        "Pesanan Dibatalkan",
        "Menunggu Pembayaran",
        "Menunggu Dipasang",
        "Diproses",
        "Berhasil",
        "Selesai",
      ],
    };
    try {
      const response = await getListTransactions(payload);
      setListTransactions(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    onFetch();
  }, []);

  return (
    <>
      <Breadcrumb items={breadCumbLabaRugi} />
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <Col span={24} style={{ textAlign: "center" }}>
          hai
        </Col>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default withProtectedPage(ListTransactions);
