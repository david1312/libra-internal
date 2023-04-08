import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Col, Divider, Row, Input, Button } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getListAllSales } from "@/services/transactions";
// import {
//   FieldTimeOutlined,
//   LoadingOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { currencyFormat, formatNumber } from "@/utils/utils";

interface DataType {
  key: string;
  no: number;
  no_pesanan: string;
  tanggal: string;
  channel: string;
  nett_sales: number;
  gross_profit: number;
  potongan_marketplace: number;
  net_profit: number;
  // tags: string[];
}

const ListTransactions = () => {
  const [listTransactions, setListTransactions] = useState<DataType[]>([]);
  const [summaryData, setSummaryData] = useState<any>({});
  const [paginationData, setPaginationData] = useState<any>({});

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
      dataIndex: "no_pesanan",
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
      dataIndex: "nett_sales",
      key: "sales_nett_sales",
      render: (text) => formatNumber(text),
    },
    {
      title: "Laba Kotor",
      dataIndex: "gross_profit",
      key: "sales_gross_profit",
      render: (text) => formatNumber(text),
    },
    {
      title: "Fee Marketplace",
      dataIndex: "potongan_marketplace",
      key: "sales_fee",
      render: (text) => formatNumber(text),
    },
    {
      title: "Laba Bersih",
      dataIndex: "net_profit",
      key: "sales_net_profit",
      render: (text) => formatNumber(text),
    },
  ];

  const onFetchSales = async (
    limit: number = 20,
    page: number = 1,
    start_date?: string,
    end_date?: string,
    no_pesanan?: string
  ) => {
    const payload = {
      limit: limit || 20,
      page: page || 1,
      start_date: start_date,
      end_date: end_date,
      no_pesanan: no_pesanan || "",
    };
    try {
      const response = await getListAllSales(payload);
      const salesList = response.data.data.data || [];
      const paginationData = response.data.data.pagination || {};
      const summaryData = response.data.data.summary_data || {};

      setPaginationData(paginationData);
      setSummaryData(summaryData);
      setListTransactions(
        salesList.map((val: any, index: number) => {
          return {
            key: `${val.id}`,
            no: index + 1 + (paginationData.cur_page - 1) * limit,
            ...val,
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    console.log("called");
    onFetchSales(20, 1, todayString, todayString);
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
        <Col span={24} style={{ maxHeight: "480px", overflow: "auto" }}>
          <Table
            columns={columns}
            dataSource={listTransactions}
            pagination={false}
          />
        </Col>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            padding: "20px",
            border: "1px solid #faa21b",
            borderRadius: "10px",
          }}
          className="f-bold"
        >
          <Col span={8}>
            Total Transaksi : {formatNumber(paginationData.total_record, 0)}
          </Col>
          <Col span={8}>
            Total Omset : {formatNumber(summaryData.total_nett_sales)}
          </Col>

          <Col span={8}>
            Laba Kotor : {formatNumber(summaryData.total_gross_profit)}
          </Col>
          <Col span={8}>
            Potongan Market Place :{" "}
            {formatNumber(summaryData.total_potongan_marketplace)}
          </Col>
          <Col span={8}>
            Laba Bersih : {formatNumber(summaryData.total_net_profit)}
          </Col>
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
