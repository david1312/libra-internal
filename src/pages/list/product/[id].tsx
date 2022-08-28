import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card, Divider, Image, Spin } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getDetailProduct, getListProduct } from "@/services/product";

const DetailProduct = () => {
  const params = useParams();
  const { detailProduct, isLoading } = getDetailProduct(params?.id);

  if (isLoading) return <Spin />;
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/product">Daftar Product</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail Product</Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td colSpan={2}>
              <h2 className="m-0 text-[#a70000] font-bold">Detail Product</h2>
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Nama Barang</td>
            <td>: {detailProduct?.nama_barang}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Ukuran</td>
            <td>: {detailProduct?.ukuran}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Jenis Ban</td>
            <td>: {detailProduct?.jenis_ban}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Posisi</td>
            <td>: {detailProduct?.posisi}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Jenis Motor</td>
            <td>: {detailProduct?.jenis_motor}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Kompatibilitas</td>
            <td>
              :{" "}
              {detailProduct?.kompatibilitas?.map((e: any) => e.url).join(", ")}
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Produk Terjual</td>
            <td>: {detailProduct?.total_terjual}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Gambar Produk</td>
            <td>:</td>
          </tr>
          <tr>
            <td></td>
            <td>
              {detailProduct?.image_list?.map((e: any) => (
                <>
                  <Image src={e?.url} width="250px" />
                </>
              ))}
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
};

export default withProtectedPage(DetailProduct);
