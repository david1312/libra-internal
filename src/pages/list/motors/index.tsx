import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Divider,
  Button,
  Tooltip,
  message,
  Input,
  Select,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import {
  getListMotors,
  getMasterBrand,
  getMasterCategoryMotors,
  removeMasterMotors,
} from "@/services/master";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { paginat } from "@/utils/utils";
const BrandBan = () => {
  const navigate = useNavigate();
  const { dataMasterBrand } = getMasterBrand();
  const { dataMasterCategory } = getMasterCategoryMotors();
  const [query, setQuery] = useState<any>({});
  const [listMotors, setListMotors] = useState<any>([]);

  const onFetch = async (
    limit?: any,
    page?: any,
    name?: any,
    id_brand_motor?: any,
    id_category_motor?: any
  ) => {
    const payload = {
      name: name,
      id_brand_motor: id_brand_motor,
      id_category_motor: id_category_motor,
      page: page || 1,
      limit: limit || 10,
    };
    try {
      const response = await getListMotors(JSON.stringify(payload));
      setListMotors(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    onFetch();
  }, []);

  const currentPath = useLocation().pathname;

  const onDelete = async (id: any) => {
    const payload = {
      id: id,
    };
    try {
      await removeMasterMotors(payload).then(() => onFetch());
      message.success(`Deleted file successfull.`);
    } catch (error) {
      message.error(`Deleted file failed.`);
    }
  };

  const columns = [
    // {
    //   title: "NO",
    //   dataIndex: "no",
    //   key: "no",
    //   width: 50,
    // },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "BRAND MOTOR",
      dataIndex: "brand_motor",
      key: "brand_motor",
    },
    {
      title: "CATEGORY MOTOR",
      dataIndex: "category_motor",
      key: "icon",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <img width="81px" src={record?.icon}></img>
        </>
      ),
    },
    ,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Update" color={"#FAA21B"}>
            <Button
              onClick={() => {
                navigate("/list/motors/form/" + record?.id);
              }}
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
            />
          </Tooltip>
          &nbsp;
          <Tooltip title="Change Image" color={"#FAA21B"}>
            <Button
              onClick={() => {
                navigate("/list/motors/form/update-icon/" + record?.id);
              }}
              icon={<FileImageOutlined />}
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

  const set = (value: any) => setQuery((p: any) => ({ ...p, ...value }));

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor">Daftar Varian Motor</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
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
              options={(dataMasterBrand || [])?.map((e: any) => ({
                value: e.id,
                label: e.nama,
              }))}
              onChange={(e) => set({ id_brand_motor: e })}
              placeholder="Masukkan brand "
            />
            <Select
              style={{ width: 200 }}
              options={(dataMasterCategory || [])?.map((e: any) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(e) => set({ id_category_motor: e })}
              placeholder="Masukkan category "
            />
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={() =>
                onFetch(
                  100,
                  1,
                  query?.name,
                  query?.id_brand_motor,
                  query?.id_category_motor
                )
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
                onClick={() => navigate(currentPath + "/form")}
              >
                Add New Motor
              </Button>
            </span>
          </td>
        </tr>
      </table>

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          currentPage={listMotors?.info?.cur_page}
          data={listMotors?.data?.map((e: any, i: number) => ({
            ...e,
            no: paginat(listMotors, i),
          }))}
          pagination={true}
          total={listMotors?.info?.total_record}
          onChange={(e: any, i: any) => {
            onFetch(i, e);
          }}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
