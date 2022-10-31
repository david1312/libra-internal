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
  Select,
  Tooltip,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getListProduct } from "@/services/product";
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
} from "@/services/master";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<any>([]);
  const navigate = useNavigate();
  const { dataTireBrand } = getMasterTireBrand();
  const { dataMasterSizeRaw } = getMasterSizeRaw();

  const [query, setQuery] = useState<any>({});

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
              onClick={() => {
                navigate("/list/product/form/" + record?.id);
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
                onClick={() => navigate(currentPath + "/form  ")}
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
    </>
  );
};

export default withProtectedPage(ListProduct);
