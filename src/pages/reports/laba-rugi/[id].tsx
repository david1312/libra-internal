import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, Col, Divider, Row, Spin } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";

const detailPemesanan = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    // onFetch();
  }, []);
  const breadCumbLabaRugiDetail = [
    {
      title: "Laporan",
    },
    {
      title: "Laporan Laba Rugi Seluruh Faktur",
    },
    {
      title: "Detail Sebuah Faktur",
    },
  ];

  if (loading) return <Spin />;
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

          <Col span={4} className="f-bold f-12">
            No Invoice
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            No Ref
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Tanggal
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Nama Toko
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Channel
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Pelanggan
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>

          <Col span={4} className="f-bold f-12">
            Status
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Sub Total
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Diskon
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Diskon Lainnya
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Biaya Lain
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>

          <Col span={4} className="f-bold f-12">
            Harga Jual / Net Sales
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            HPP
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Gross Profit
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Fee Marketplace
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
          <Col span={4} className="f-bold f-12">
            Laba Bersih
          </Col>
          <Col span={20} className="f-bold f-12">
            : {params.id}
          </Col>
        </Row>
        <Divider />
      </Card>
    </>
  );
};

export default withProtectedPage(detailPemesanan);
