import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, Col, Divider, Row, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getSalesByInvoice } from "@/services/transactions";
import { DataTypeInvoice, INVOICE_DATA } from "@/interfaces/interface_sales";
import { get } from "lodash";
import { TYPE_DATA } from "@/constants/common";
import { formatNumber, transformDate, transformDateDB } from "@/utils/utils";
import Table, { ColumnsType } from "antd/es/table";
import LoadingData from "@/components/loading/LoadingData";

const detailPemesanan = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState<any>({});
  const [listItems, setListItems] = useState<DataTypeInvoice[]>([]);

  const onFetchInvoice = async () => {
    setLoading(true);
    const payload = {
      no_pesanan: params?.id,
    };
    try {
      const response = await getSalesByInvoice(payload);
      const listItemsData = get(response, "data.data.item_list", []);
      setInvoice(response.data.data);
      setListItems(
        listItemsData.map((val: any, index: number) => {
          return {
            key: `tableInvoiceItem${index}`,
            no: index + 1,
            ...val,
          };
        })
      );
      setLoading(false);
    } catch (error) {
      message.error("failed to get data");
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchInvoice();
  }, []);
  const breadCumbLabaRugiDetail = [
    {
      title: "Laporan",
    },
    {
      title: "Laporan Laba Rugi Seluruh Faktur",
      href: "/reports/laba-rugi",
    },
    {
      title: "Detail Sebuah Faktur",
    },
  ];

  const columns: ColumnsType<DataTypeInvoice> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Nama",
      dataIndex: "nama_barang",
      key: "nama_barang",
    },
    {
      title: "HPP",
      dataIndex: "hpp_satuan",
      key: "hpp_satuan",
      render: (text) => formatNumber(text),
    },
    {
      title: "Harga Jual Satuan",
      dataIndex: "harga_satuan",
      key: "harga_satuan",
      render: (text) => formatNumber(text),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (text) => formatNumber(text),
    },
    {
      title: "Total Harga",
      dataIndex: "total_harga",
      key: "total_harga",
      render: (text) => formatNumber(text),
    },
    {
      title: "Diskon Persen",
      dataIndex: "diskon_percent",
      key: "diskon_percent",
      render: (text) => `${formatNumber(text)} %`,
    },
    {
      title: "Total Diskon",
      dataIndex: "diskon",
      key: "diskon",
      render: (text) => formatNumber(text),
    },
    {
      title: "Harga Final",
      dataIndex: "harga_final",
      key: "harga_final",
      render: (text) => formatNumber(text),
    },
    {
      title: "Total HPP",
      dataIndex: "total_hpp",
      key: "diskon",
      render: (text) => formatNumber(text),
    },
    {
      title: "Laba Kotor",
      dataIndex: "gross_profit",
      key: "gross_profit",
      render: (text) => formatNumber(text),
    },
  ];

  if (loading) return <LoadingData />;
  return (
    <>
      <Breadcrumb items={breadCumbLabaRugiDetail} />

      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 16,
        }}
      >
        <Row>
          <Col span={24} className="f-bold c-primary f-14">
            Detail Faktur {params.id}
          </Col>
          <Divider style={{ marginTop: "15px" }} />
          {INVOICE_DATA.map((val) => {
            return (
              <React.Fragment key={`invoice${val.value}`}>
                <Col span={4} className="f-bold f-12">
                  {val.title}
                </Col>
                <Col span={20} className="f-bold f-12">
                  :{" "}
                  {val.type === TYPE_DATA.TEXT
                    ? get(invoice, `sales_detail.${val.value}`, "-")
                    : val.type === TYPE_DATA.MONEY
                    ? formatNumber(
                        get(invoice, `sales_detail.${val.value}`, 0),
                        2
                      )
                    : transformDate(
                        transformDateDB(
                          get(invoice, `sales_detail.${val.value}`, "")
                        )
                      )}
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
        <Divider />
        <Col span={24} style={{ maxHeight: "600px", overflow: "auto" }}>
          <Table columns={columns} dataSource={listItems} pagination={false} />
        </Col>
      </Card>
    </>
  );
};

export default withProtectedPage(detailPemesanan);
