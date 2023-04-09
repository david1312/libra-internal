import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Col, Divider, Row, Input, Button } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getListAllSales } from "@/services/transactions";
import Table, { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { formatNumber, transformDate, transformDateDB } from "@/utils/utils";
import TablePagination from "@/components/common/TablePagination";

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
}

const ListTransactions = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const [listTransactions, setListTransactions] = useState<DataType[]>([]);
  const [summaryData, setSummaryData] = useState<any>({});
  const [paginationData, setPaginationData] = useState<any>({});
  const [listPaging, setListPaging] = useState<number[]>([]);

  const yesterday = new Date(Date.now() - 86400000);
  const yesterdayString = yesterday.toISOString().slice(0, 10);
  const [query, setQuery] = useState({
    startDate: yesterdayString,
    endDate: yesterdayString,
    noPesanan: "",
  });

  const detailInvoice = (idInvoice: string) => {
    console.log(currentPath);
    navigate(`${currentPath}/${idInvoice}`);
  };

  const onPrevPagination = () => {
    console.log({ paginationData });
    if (paginationData.cur_page === 1) {
      console.log("a");
      onFetchSales(20, 1, query.startDate, query.endDate);
    } else {
      console.log("b", paginationData.cur_page - 1);
      onFetchSales(
        20,
        paginationData.cur_page - 1,
        query.startDate,
        query.endDate
      );
    }
  };

  const onNextPagination = () => {
    console.log({ paginationData });
    if (paginationData.cur_page === paginationData.max_page) {
      onFetchSales(20, paginationData.max_page, query.startDate, query.endDate);
    } else {
      onFetchSales(
        20,
        paginationData.cur_page + 1,
        query.startDate,
        query.endDate
      );
    }
  };

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
      render: (text) => <a onClick={() => detailInvoice(text)}>{text}</a>,
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
    end_date?: string
  ) => {
    const payload = {
      limit: limit || 20,
      page: page || 1,
      start_date: start_date,
      end_date: end_date,
      no_pesanan: query.noPesanan || "",
    };
    try {
      const response = await getListAllSales(payload);
      const salesList = response.data.data.data || [];
      const paginationData = response.data.data.pagination || {};
      const summaryData = response.data.data.summary_data || {};
      let pagingList = [];

      for (let index = 1; index <= paginationData.max_page; index++) {
        pagingList.push(index);
      }

      setListPaging(pagingList);
      setPaginationData(paginationData);
      setSummaryData(summaryData);

      setListTransactions(
        salesList.map((val: any, index: number) => {
          return {
            key: `${val.id}`,
            no: index + 1 + (paginationData.cur_page - 1) * limit,
            ...val,
            tanggal: transformDateDB(val.tanggal),
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    console.log("called");
    onFetchSales(20, 1, query.startDate, query.endDate);
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
            <Col span={4} className="f-14 f-bold ml-1">
              No Pesanan / Invoice
            </Col>
          </Col>
          <Col span={24} className="filter-bar">
            <Col span={4}>
              <Input
                type="date"
                id="start_date"
                defaultValue={query.startDate}
                value={query.startDate}
                onChange={(e) => {
                  setQuery((value) => ({
                    ...value,
                    startDate: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col span={4} className="ml-1">
              <Input
                type="date"
                id="end_date"
                defaultValue={query.startDate}
                value={query.endDate}
                onChange={(e) => {
                  setQuery((value) => ({
                    ...value,
                    endDate: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col span={4} className="ml-1">
              <Input
                type="text"
                id="no_pesanan"
                defaultValue={query.noPesanan}
                value={query.noPesanan}
                onChange={(e) => {
                  setQuery((value) => ({
                    ...value,
                    noPesanan: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col span={4} className="ml-1">
              <Button
                icon={<SearchOutlined />}
                type="primary"
                onClick={() =>
                  onFetchSales(20, 1, query.startDate, query.endDate)
                }
              >
                Tampilkan
              </Button>
            </Col>
          </Col>
        </Row>
        <Col
          span={24}
          style={{
            textAlign: "center",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          Laporan Laba Rugi Periode :<br />
          {`${transformDate(query.startDate)} - ${transformDate(
            query.endDate
          )}`}
          <br />
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
          <Col span={4}>Total Transaksi</Col>
          <Col span={8}>: {formatNumber(paginationData.total_record, 0)}</Col>
          <Col span={4}>Total Omset Penjualan</Col>
          <Col span={8}>: {formatNumber(summaryData.total_nett_sales)}</Col>

          <Col span={4}>Laba Kotor Penjualan</Col>
          <Col span={8}>: {formatNumber(summaryData.total_gross_profit)}</Col>
          <Col span={4}>Total Fee MarketPlace</Col>
          <Col span={8}>
            : {formatNumber(summaryData.total_potongan_marketplace)}
          </Col>
          <Col span={4}>Laba Bersih Penjualan</Col>
          <Col span={8}>: {formatNumber(summaryData.total_net_profit)}</Col>
        </Row>
        <TablePagination
          paginationData={paginationData}
          onFetchSales={onFetchSales}
          query={query}
          onPrevPagination={onPrevPagination}
          listPaging={listPaging}
          onNextPagination={onNextPagination}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(ListTransactions);
