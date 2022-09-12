import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card, Divider, message, Spin } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getDetailTransactions } from "@/services/transactions";

const detailPemesanan = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [detailPemesanan, setDetailPemesanan] = useState<any>({});

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
                {detailPemesanan?.list_product?.map((e: any) => {
                  return (
                    <tr>
                      <td>{e.nama_barang}</td>
                      <td>{e.jenis_ban}</td>
                      <td>{e.ukuran}</td>
                      <td>{e.qty}</td>
                      <td>{e.harga_satuan_formatted}</td>
                      <td>{e.harga_total_formatted}</td>
                    </tr>
                  );
                })}
              </table>
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
};

export default withProtectedPage(detailPemesanan);
