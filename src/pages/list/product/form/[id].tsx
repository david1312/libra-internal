import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
  addMasterProduct,
  getMasterTireBrand,
  getMasterTireSize,
  getMasterTireType,
} from "@/services/master";
import FileUploader from "@/components/FileUploader";
import _isEmpty from "lodash/isEmpty";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "NAME",
    dataIndex: "nama",
    key: "nama",
  },
  {
    title: "LOGO",
    dataIndex: "icon",
    key: "icon",
    align: "center",
    render: (_: any, record: any) => (
      <>
        <img width="81px" src={record?.icon}></img>
      </>
    ),
  },
];

const BrandBan = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { dataTireBrand } = getMasterTireBrand();
  const { dataTireType } = getMasterTireType();
  const { dataTireSize } = getMasterTireSize();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("sku", form?.sku);
      data.append("name", form?.name);
      data.append("brand_id", form?.brand_id);
      data.append("tire_type", form?.tire_type);
      data.append("size", form?.tire_size);
      data.append("price", form?.price);
      data.append("stock", form?.stock);
      data.append("description", form?.description);

      form?.data?.map((e: any) => {
        data.append("photos", e.originFileObj);
      });
      await addMasterProduct(data).then(() => {
        navigate("/list/product");
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
    }
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor">Daftar Product</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Add Product</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                SKU
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) => {
                  setForm((prev: any) => ({ ...prev, sku: e.target.value }));
                }}
                disabled={loading}
                placeholder="Masukkan SKU"
              />
            </td>
          </tr>
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
                disabled={loading}
                placeholder="Masukkan description"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Photos
              </span>
            </td>
            <td>:</td>
            <td>
              <FileUploader
                onData={(data: any) =>
                  setForm((prev: any) => ({ ...prev, data: data }))
                }
                disabled={loading}
                multiple={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-red-600 mt-2">*required</div>
              <div className="text-red-600 mt-2">**max. 1 MB</div>
            </td>
            <td colSpan={2}>
              <span style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={
                    !form?.name ||
                    !form?.data ||
                    !form?.tire_type ||
                    !form?.brand_id ||
                    !form?.sku ||
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
