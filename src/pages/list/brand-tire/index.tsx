import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Divider, Button, Tooltip, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getMasterTireBrand, removeMasterTireBrand } from "@/services/master";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

const BrandBan = () => {
  const { dataTireBrand, mutateList } = getMasterTireBrand();
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const onDelete = async (id: any) => {
    const payload = {
      id: id,
    };
    try {
      await removeMasterTireBrand(payload).then(() =>
        mutateList(dataTireBrand.filter((e: any) => e.id_merk !== id))
      );
      message.success(`Deleted file successfull.`);
    } catch (error) {
      message.error(`Deleted file failed.`);
    }
  };

  const columns = [
    {
      title: "NO",
      dataIndex: "no",
      key: "no",
      width: 50,
    },
    {
      title: "ID",
      dataIndex: "id_merk",
      key: "id_merk",
    },
    {
      title: "MERK",
      dataIndex: "merk",
      key: "merk",
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
                navigate("/list/brand-tire/form/" + record?.id_merk);
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
                navigate(
                  "/list/brand-tire/form/update-icon/" + record?.id_merk
                );
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
                onDelete(record?.id_merk);
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
          <NavLink to="/list/brand-motor">Daftar Merk Motor</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />
      <table width={"100%"}>
        <tr>
          <td>
            <span style={{ float: "right" }}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate(currentPath + "/form  ")}
              >
                Add New Brand
              </Button>
            </span>
          </td>
        </tr>
      </table>

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={dataTireBrand?.map((e: any, i: number) => ({
            ...e,
            no: i + 1,
          }))}
          pagination={true}
          onChange={(e: any, i: any) => {}}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
