import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Select, Tooltip } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getListProduct } from "@/services/product";
import Icon, { EyeOutlined } from "@ant-design/icons";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<any>([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
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
          <img width="81px" src={record?.display_image}></img>
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
          <Tooltip title="Detail">
            <Button
              onClick={() => {
                navigate("/list/product/" + record?.id);
              }}
              icon={<EyeOutlined />}
              shape="circle"
              type="primary"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const currentPath = useLocation().pathname;

  const onFetch = async () => {
    const payload = {
      name: "",
    };
    try {
      const response = await getListProduct(JSON.stringify(payload));
      setListProduct(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    onFetch();
  }, []);

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

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={listProduct?.data?.map((e: any, index: number) => ({
            ...e,
            no: index + 1,
          }))}
          total={listProduct?.info?.total_record}
          currentPage={1}
          pagination={true}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(ListProduct);
