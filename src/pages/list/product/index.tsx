import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Image,
  Input,
  message,
  Modal,
  Select,
  Tooltip,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import {
  detailProduct,
  getDetailProduct,
  getListProduct,
  updateProduct,
} from "@/services/product";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import {
  deleteProduct,
  getMasterSizeRaw,
  getMasterTireBrand,
  getMasterTireSize,
  getMasterTireType,
} from "@/services/master";
import _isEmpty from "lodash/isEmpty";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<any>([]);
  const navigate = useNavigate();
  const { dataTireBrand } = getMasterTireBrand();
  const { dataMasterSizeRaw } = getMasterSizeRaw();
  const { dataTireType } = getMasterTireType();
  const { dataTireSize } = getMasterTireSize();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any>({ show: false, data: {} });

  const [query, setQuery] = useState<any>({});

  const currentPath = useLocation().pathname;

  const onDelete = async (id: any) => {
    const payload = {
      id: id,
    };
    try {
      await deleteProduct(payload).then(() => onFetch());
      message.success(`Deleted file successfull.`);
    } catch (error) {
      message.error(`Deleted file failed.`);
    }
  };

  const onFetch = async (
    limit?: any,
    page?: any,
    name?: any,
    brand_id?: any,
    tire_size?: any
  ) => {
    const payload = {
      name: name,
      merkban: brand_id?.filter((e: any) => Boolean(e)),
      ukuran: tire_size?.filter((e: any) => Boolean(e)),
      page: page || 1,
      limit: limit || 1000,
    };
    try {
      const response = await getListProduct(JSON.stringify(payload));
      setListProduct(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    onFetch(100, 1);
  }, []);

  const set = (value: any) => setQuery((p: any) => ({ ...p, ...value }));

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      id: edit?.data?.id,
      name: edit?.data?.name,
      id_tire_brand: edit?.data?.brand_id,
      tire_type: edit?.data?.tire_type,
      size: edit?.data?.tire_size,
      price: edit?.data?.price,
      stock: Number(edit?.data?.stock),
      description: edit?.data?.description,
    };
    try {
      await updateProduct(JSON.stringify(payload)).then(() => {
        onFetch(100, 1);
        setEdit({ data: "", show: false });
        setLoading(false);
      });
    } catch (error) {
      message.error(`${edit?.data?.name} file failed.`);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "nama_barang",
      key: "nama",
    },
    {
      title: "JENIS",
      dataIndex: "jenis_ban",
      key: "jenis",
    },
    {
      title: "UKURAN",
      dataIndex: "ukuran",
      key: "ukuran",
    },
    {
      title: "HARGA FINAL",
      dataIndex: "harga_jual_final",
      key: "harga_jual",
    },
    {
      title: "GAMBAR",
      dataIndex: "display_image",
      key: "display_image",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <Image width="81px" src={record?.display_image} />
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Detail" color={"#FAA21B"}>
            <Button
              onClick={() => {
                navigate("/list/product/" + record?.id);
              }}
              icon={<EyeOutlined />}
              shape="circle"
              type="primary"
            />
          </Tooltip>
          &nbsp;
          <Tooltip title="Edit Product" color={"#FAA21B"}>
            <Button
              onClick={async () => {
                try {
                  const response: any = await detailProduct(record?.id);
                  setEdit({
                    show: true,
                    data: {
                      id: response?.data.data?.id,
                      name: response?.data.data.nama_barang,
                      brand_id: response?.data.data?.nama_barang.split(" ")[0],
                      tire_type: response?.data.data?.jenis_ban,
                      tire_ring: response?.data.data?.tire_ring,
                      tire_size: response?.data.data?.ukuran,
                      price: response?.data.data?.harga_jual_final,
                      description: response?.data.data?.deskripsi,
                      stock: Number(response?.data.data?.stock),
                    },
                  });
                } catch (error) {
                  message.error(`Failed to get data.`);
                }
              }}
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
            />
          </Tooltip>
          &nbsp;
          <Tooltip title="Delete" color="red">
            <Button
              onClick={() => {
                onDelete(record?.id);
              }}
              icon={<DeleteOutlined />}
              shape="circle"
              type="primary"
              danger
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/product">Daftar Product</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />
      <table width={"100%"}>
        <tr>
          <td>
            <Input
              placeholder="Masukkan nama"
              onChange={(e: any) => set({ name: e.target.value })}
            />
          </td>
          <td>
            <Select
              style={{ width: 200 }}
              options={(dataTireBrand || [])?.map((e: any) => ({
                value: e.id_merk,
                label: e.merk,
              }))}
              onChange={(e) => set({ merkban: [e] })}
              allowClear
              placeholder="Masukkan merk ban "
            />
            <Select
              style={{ width: 200 }}
              options={(dataMasterSizeRaw || [])?.map((e: any) => ({
                value: e.value,
                label: e.value,
              }))}
              onChange={(e) => set({ ukuran: [e] })}
              placeholder="Masukkan size "
            />
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={() =>
                onFetch(100, 1, query?.name, query?.merkban, query?.ukuran)
              }
            >
              Search
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="ghost"
              onClick={() => onFetch(100, 1)}
            >
              Clear
            </Button>
          </td>
          <td>
            <span style={{ float: "right" }}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate(currentPath + "/edit?.data  ")}
              >
                Add New Product
              </Button>
            </span>
          </td>
        </tr>
      </table>

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={listProduct?.data}
          total={listProduct?.info?.total_record}
          pagination={true}
          onChange={(e: any, i: any) => onFetch(i, e)}
        />
      </Card>
      <Modal
        visible={edit?.show}
        title="Edit Product"
        onCancel={() => setEdit({ data: "", show: false })}
        footer={[
          <Button key="back" onClick={() => setEdit({ data: "", show: false })}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            disabled={
              !edit?.data?.name ||
              !edit?.data?.tire_type ||
              !edit?.data?.brand_id ||
              !edit?.data?.tire_size ||
              !edit?.data?.price ||
              !edit?.data?.description
            }
          >
            Submit
          </Button>,
        ]}
      >
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
                value={edit?.data?.name}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, name: e.target.value },
                  }))
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
                value={edit?.data?.brand_id}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, brand_id: e },
                  }))
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
                value={edit?.data?.tire_type}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, tire_type: e },
                  }))
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
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, tire_ring: e },
                  }))
                }
                value={edit?.data?.tire_ring}
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
                    ?.filter((e: any) => e?.ring_ban === edit?.data?.tire_ring)
                    .map((e: any) =>
                      e?.list_ukuran?.map((d: any) => ({
                        value: d.ukuran,
                        label: d.ukuran,
                      }))
                    )[0]
                }
                value={edit?.data?.tire_size}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, tire_size: e },
                  }))
                }
                disabled={loading || _isEmpty(edit?.data?.tire_ring)}
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
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, price: e.target.value },
                  }))
                }
                disabled={loading}
                value={edit?.data?.price}
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
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, stock: e.target.value },
                  }))
                }
                disabled={loading}
                type="number"
                value={edit?.data?.stock}
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
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, description: e.target.value },
                  }))
                }
                value={edit?.data?.description}
                disabled={loading}
                placeholder="Masukkan description"
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-red-600 mt-2">*required</div>
            </td>
          </tr>
        </table>
      </Modal>
    </>
  );
};

export default withProtectedPage(ListProduct);
