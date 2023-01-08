import { useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Image,
  Input,
  message,
  Modal,
  Spin,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  getDetailTransactions,
  updateStatusTransactions,
} from "@/services/transactions";
import {
  FieldTimeOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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
    onFetch();
  }, []);

  if (loading) return <Spin />;
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Pemesanan</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/pemesanan/pemasangan">Pemasangan Ban</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail Pemesanan</Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td colSpan={2}>
              <h2 className="m-0 text-[#a70000] font-bold">Detail Pemesanan</h2>
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Invoice ID</td>
            <td>: {detailPemesanan?.invoice_id}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Schedule</td>
            <td>: {detailPemesanan?.installation_time}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Outlet</td>
            <td>: {detailPemesanan?.outlet_name}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Address</td>
            <td>: {detailPemesanan?.outlet_address}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Phone Outlet</td>
            <td>: {detailPemesanan?.outlet_cs_number}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Payment Method</td>
            <td>: {detailPemesanan?.payment_method}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Payment Method Desc</td>
            <td>: {detailPemesanan?.payment_method_desc}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">List Produk</td>
            <td>:</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table
                width={"100%"}
                style={{ border: "1px solid" }}
                cellPadding="8"
              >
                <tr>
                  <th>Nama Barang</th>
                  <th>Jenis Ban</th>
                  <th>Ukuran</th>
                  <th>Jumlah</th>
                  <th>Harga Satuan</th>
                  <th>Harga Total</th>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <hr />
                  </td>
                </tr>

                {detailPemesanan?.list_product?.map(
                  (e: any, i: number, row: any) => {
                    return (
                      <>
                        <tr>
                          <td>{e.nama_barang}</td>
                          <td>{e.jenis_ban}</td>
                          <td>{e.ukuran}</td>
                          <td>{e.qty}</td>
                          <td>{e.harga_satuan_formatted}</td>
                          <td>{e.harga_total_formatted}</td>
                        </tr>
                        {row?.length !== i + 1 && (
                          <tr>
                            <td colSpan={6}>
                              <hr />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  }
                )}
              </table>
            </td>
          </tr>
        </table>
        <Divider />
        <span style={{ float: "right" }}>
          <Button
            style={{
              backgroundColor: condition(detailPemesanan?.status)?.color,
              color: "#fff",
            }}
            onClick={() => {
              setConfirmation(true);
              return;
            }}
          >
            {condition(detailPemesanan?.status)?.wording}
          </Button>
        </span>
      </Card>
      <Modal
        title={`Apakah Anda Yakin - ${
          condition(detailPemesanan?.status)?.next
        }`}
        visible={confirmation}
        onOk={() => {
          onProcess(condition(detailPemesanan?.status)?.next);
        }}
        confirmLoading={loading}
        onCancel={() => setConfirmation(false)}
        width={1000}
      >
        {condition(detailPemesanan?.status)?.next === "Pesanan Dibatalkan" && (
          <>
            <strong>Masukkan Alasan Anda</strong>
            <br />
            <Input
              name="reason"
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Tulis disini"
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default withProtectedPage(detailPemesanan);
