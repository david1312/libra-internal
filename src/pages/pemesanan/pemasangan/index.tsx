import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Tooltip } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getListTransactions } from "@/services/transactions";
import {
  FieldTimeOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const color = (type: any) => {
  let color = "";
  let icon = undefined;

  switch (type) {
    case "Menunggu Pembayaran":
      color = "#ff5b00";
      icon = <FieldTimeOutlined />;
      break;

    case "Menunggu Dipasang":
      color = "#ffbf00";
      icon = <FieldTimeOutlined />;
      break;

    case "Diproses":
      color = "#5bc0de";
      icon = <LoadingOutlined />;

      break;

    case "Pesanan Dibatalkan":
      color = "red";
      icon = <CloseCircleOutlined />;
      break;

    default:
      color = "#22bb33";
      icon = <CheckCircleOutlined />;

      break;
  }
  return {
    color,
    icon,
  };
};

const ListTransactions = () => {
  const [listTransactions, setListTransactions] = useState<any>([]);

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
      title: "TANGGAL",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "LOKASI",
      dataIndex: "outlet_name",
      key: "outlet_name",
      align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <Button
            style={{
              background: color(record?.status)?.color,
              color: "#fff",
              width: "100%",
            }}
            icon={color(record?.status)?.icon}
          >
            {record?.status}
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          &nbsp;
          <Tooltip title="Detail" color={"#FAA21B"}>
            <Button
              onClick={() => {
                navigate("/pemesanan/pemasangan/" + record?.invoice_id);
              }}
              icon={<EyeOutlined />}
              shape="circle"
              type="primary"
            />
          </Tooltip>
        </>
      ),
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
      <Breadcrumb>
        <Breadcrumb.Item>Pemesanan</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/pemesanan/pemasangan">Pemasangan Ban</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={listTransactions?.data?.map((e: any, index: number) => ({
            ...e,
            no: index + 1,
          }))}
          total={listTransactions?.info?.total_record}
          pagination={true}
          onChange={(e: any, i: any) => onFetch(i, e)}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(ListTransactions);
