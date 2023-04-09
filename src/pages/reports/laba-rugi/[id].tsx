import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Input,
  message,
  Modal,
  Row,
  Spin,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  getDetailTransactions,
  updateStatusTransactions,
} from "@/services/transactions";

const condition = (type: any) => {
  let color = "";
  let next = "";
  let wording = "";

  switch (type) {
    case "Menunggu Pembayaran":
      color = "#ff5b00";
      next = "Pesanan Dibatalkan";
      wording = "Batalkan Pesanan";
      break;

    case "Menunggu Dipasang":
      color = "#ffbf00";
      next = "Diproses";
      wording = "Proses Pesanan";
      break;

    case "Diproses":
      color = "#22bb33";
      next = "Berhasil";
      wording = "Selesaikan Pesanan";
      break;

    default:
      color = "transparent";
      next = "Selesaikan Pesanan";
      wording = "";

      break;
  }
  return {
    color,
    next,
    wording,
  };
};

const detailPemesanan = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [detailPemesanan, setDetailPemesanan] = useState<any>({});
  const [confirmation, setConfirmation] = useState(false);
  const [validatePayment, setValidatePayment] = useState(false);
  const [extraNotes, setExtraNotes] = useState("");

  const onFetch = async () => {
    setLoading(true);
    const payload = {
      invoice_id: params?.id,
    };
    try {
      const response = await getDetailTransactions(payload);
      setDetailPemesanan(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error("failed to get data");
      setLoading(false);
    }
  };

  const onProcess = async (status: any) => {
    setLoading(true);
    const payload = {
      invoice_id: params?.id,
      status: status,
      notes: extraNotes,
    };
    try {
      const response = await updateStatusTransactions(payload);
      setDetailPemesanan(response.data.data);
      message.success("Pemesanan successfully update");
      setLoading(false);
      navigate("/pemesanan/pemasangan");
    } catch (error) {
      message.error("failed to get data");
      setLoading(false);
    }
  };

  useEffect(() => {
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
