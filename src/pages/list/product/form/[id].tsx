import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Input,
  message,
  Select,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  getMasterTireBrand,
  getMasterTireSize,
  getMasterTireType,
} from "@/services/master";
import _isEmpty from "lodash/isEmpty";
import { getDetailProduct, updateProduct } from "@/services/product";
import LoadingPage from "@/components/loading/LoadingPage";

const BrandBan = () => {
  const params = useParams();
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { dataTireBrand } = getMasterTireBrand();
  const { dataTireType } = getMasterTireType();
  const { dataTireSize } = getMasterTireSize();
  const { detailProduct, isLoading } = getDetailProduct(params?.id);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      id: detailProduct?.id,
      name: form?.name,
      id_tire_brand: form?.brand_id, // lov tire brand
      tire_type: form?.tire_type,
      size: form?.tire_size,
      price: form?.price,
      stock: Number(form?.stock),
      description: form?.description,
    };
    try {
      await updateProduct(JSON.stringify(payload)).then(() => {
        navigate("/list/product");
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
    }
  };

  useEffect(() => {
    if (detailProduct) {
      setForm({
        name:
          detailProduct?.nama_barang.split(" ")[2] ||
          detailProduct?.nama_barang,
        brand_id: detailProduct?.nama_barang.split(" ")[0],
        tire_type: detailProduct?.jenis_ban,
        size: detailProduct?.ukuran,
        price: detailProduct?.harga_jual_final,
        description: detailProduct?.deskripsi,
      });
    }
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/product">Daftar Product</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/product/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Edit Product</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Name
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                value={form?.name}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, name: e.target.value }))
                }
                disabled={loading}
                placeholder="Masukkan nama"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Brand ID
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataTireBrand || [])?.map((e: any) => ({
                  value: e.id_merk,
                  label: e.merk,
                }))}
                value={form?.brand_id}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, brand_id: e }))
                }
                disabled={loading}
                placeholder="Pilih brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Tire Type
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataTireType || [])?.map((e: any) => ({
                  value: e.value,
                  label: e.value,
                }))}
                value={form?.tire_type}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, tire_type: e }))
                }
                disabled={loading}
                placeholder="Masukkan tire type"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Tire Ring
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataTireSize || [])?.map((e: any) => ({
                  value: e.ring_ban,
                  label: e.ring_ban,
                }))}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, tire_ring: e }))
                }
                disabled={loading}
                placeholder="Pilih tire ring"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Tire Size
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={
                  (dataTireSize || [])
                    ?.filter((e: any) => e?.ring_ban === form?.tire_ring)
                    .map((e: any) =>
                      e?.list_ukuran?.map((d: any) => ({
                        value: d.ukuran,
                        label: d.ukuran,
                      }))
                    )[0]
                }
                value={form?.tire_size}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, tire_size: e }))
                }
                disabled={loading || _isEmpty(form?.tire_ring)}
                placeholder="Pilih tire size"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Price
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, price: e.target.value }))
                }
                disabled={loading}
                value={form?.price}
                type="number"
                placeholder="Masukkan harga"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Stock Barang
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, stock: e.target.value }))
                }
                disabled={loading}
                type="number"
                placeholder="Masukkan stock barang"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Description
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                value={form?.description}
                disabled={loading}
                placeholder="Masukkan description"
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-red-600 mt-2">*required</div>
            </td>
            <td colSpan={2}>
              <span style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={
                    !form?.name ||
                    !form?.tire_type ||
                    !form?.brand_id ||
                    !form?.tire_size ||
                    !form?.price ||
                    !form?.description
                  }
                >
                  Submit
                </Button>
              </span>
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
