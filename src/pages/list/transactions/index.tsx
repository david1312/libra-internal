import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Tooltip } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getListProduct } from "@/services/product";
import { EyeOutlined } from "@ant-design/icons";
import { getListTransactions, getTransactions } from "@/services/transactions";

const ListTransactions = () => {
  const [listTransactions, setListTransactions] = useState<any>([]);
  const [filter, setFilter] = useState<any>({
    limit: 10,
    page: 1,
    trans_status: [
      "Menunggu Pembayaran",
      "Menunggu Konfirmasi",
      "Menunggu Kedatangan",
      "Diproses",
      "Selesai",
    ],
    idd_outlet: "",
    list_product: "",
    payment_method: "",
    schedule_date: "",
    schedule_time: "",
  });

  //   const { dataTransactions, isLoading } = getTransactions();
  const navigate = useNavigate();

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "INVOICE ID",
      dataIndex: "invoice_id",
      key: "invoice_id",
    },
    {
      title: "TOTAL",
      dataIndex: "total_amount_formatted",
      key: "total_amount_formatted",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Detail"></Tooltip>
        </>
      ),
    },
  ];

  const currentPath = useLocation().pathname;

  const onFetch = async () => {
    const payload = {
      limit: 1000,
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
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/transactions">Daftar Transaksi</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={listTransactions?.data}
          total={listTransactions?.info?.total_record}
          currentPage={1}
          pagination={true}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(ListTransactions);
