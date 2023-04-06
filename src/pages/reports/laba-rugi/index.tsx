import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  Card,
  Col,
  Divider,
  Space,
  Tag,
  Row,
  Input,
  Button,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getListTransactions } from "@/services/transactions";
// import {
//   FieldTimeOutlined,
//   LoadingOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface DataType {
  key: string;
  no: number;
  invoice: string;
  tanggal: string;
  channel: string;
  harga_jual: number;
  laba_kotor: number;
  laba_bersih: number;
  // tags: string[];
}

const ListTransactions = () => {
  const [listTransactions, setListTransactions] = useState<any>([]);

  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);
  const [query, setQuery] = useState({
    startDate: todayString,
    endDate: todayString,
  });
  console.log({ today, todayString });

  const clickTest = (a: string) => {
    console.log(a);
  };

  //   const { dataTransactions, isLoading } = getTransactions();
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const breadCumbLabaRugi = [
    {
      title: "Laporan",
    },
    {
      title: "Laporan Laba Rugi Seluruh Faktur",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      key: "sales_no",
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "sales_invoice",
      render: (text) => <a onClick={() => clickTest(text)}>{text}</a>,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "sales_tanggal",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "sales_channel",
    },
    {
      title: "Harga Jual",
      dataIndex: "harga_jual",
      key: "sales_harga_jual",
      render: (text) =>
        text.toLocaleString("en-us", { minimumFractionDigits: 2 }),
    },
    {
      title: "Laba Kotor",
      dataIndex: "laba_kotor",
      key: "sales_kotor",
    },
    {
      title: "Laba Bersih",
      dataIndex: "laba_bersih",
      key: "sales_bersih",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.invoice}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const data: DataType[] = [
    {
      key: "1",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "2",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "3",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "4",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "5",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "6",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "7",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "8",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "9",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "10",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "11",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "12",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "13",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "14",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
    },
    {
      key: "15",
      no: 1,
      invoice: "INV-XXX",
      tanggal: "31 Mar",
      channel: "LAZADA",
      harga_jual: 100000.12,
      laba_kotor: 20000,
      laba_bersih: 15300.5,
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
    console.log("called");
    // onFetch();
  }, []);

  return (
    <>
      <Breadcrumb items={breadCumbLabaRugi} />
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <Row>
          <Col span={24} className="filter-bar">
            <Col span={4} className="f-14 f-bold">
              Tanggal Awal
            </Col>
            <Col span={4} className="f-14 f-bold ml-1">
              Tanggal Akhir
            </Col>
          </Col>
          <Col span={24} className="filter-bar">
            <Col span={4}>
              <Input
                type="date"
                id="start_date"
                defaultValue={todayString}
                value={query.startDate}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Col>
            <Col span={4} className="ml-1">
              <Input type="date" id="end_date" defaultValue={todayString} />
            </Col>
            <Col span={4} className="ml-1">
              <Button
                icon={<SearchOutlined />}
                type="primary"
                // onClick={() =>
                //   onFetch(
                //     100,
                //     1,
                //     query?.name,
                //     query?.id_brand_motor,
                //     query?.id_category_motor
                //   )
                // }
                onClick={() => {
                  setQuery((p: any) => ({ ...p, startDate: "2023-04-01" }));
                }}
              >
                Tampilkan
              </Button>
            </Col>
          </Col>
        </Row>
        <Col span={24} style={{ textAlign: "center" }}>
          Laporan Laba Rugi <br />
          21 Maret 2023 - 30 Maret 2023
        </Col>
        <Col span={24} style={{ maxHeight: "600px", overflow: "auto" }}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            justifyContent: "flex-end",
          }}
          className="f-bold"
        >
          <Col span={6}>Total Transaksi : 1,000</Col>
          <Col span={6}>Total Omset : 1,100,500,000</Col>
          <Col span={6}>Laba Kotor : 99,222,000</Col>
          <Col span={6}>Laba Bersih : 99,222,000</Col>
        </Row>

        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <Col
            span={1}
            style={{
              border: "1px solid black",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {`<`}
          </Col>
          <Col
            span={1}
            style={{
              border: "1px solid black",
              textAlign: "center",
              backgroundColor: "#FAA21B",
            }}
          >
            1
          </Col>
          <Col
            span={1}
            style={{ border: "1px solid black", textAlign: "center" }}
          >
            2
          </Col>
          <Col
            span={1}
            style={{
              border: "1px solid black",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {`>`}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default withProtectedPage(ListTransactions);
