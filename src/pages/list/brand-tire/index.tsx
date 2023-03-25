import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Divider,
  Button,
  Tooltip,
  message,
  Modal,
  Input,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import {
  getMasterTireBrand,
  removeMasterTireBrand,
  updateMasterTireBrand,
} from "@/services/master";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import _get from "lodash/get";
import { useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const { dataTireBrand, mutateList } = getMasterTireBrand();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<any>({ show: false, data: {} });
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState<any>({ show: false, data: {} });

  const location: any = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    if (location?.state?.update) {
      mutateList();
    }
  }, [location]);

  const onDelete = async (id: any) => {
    const payload = {
      id: id,
    };
    try {
      await removeMasterTireBrand(payload).then(() =>
        mutateList(dataTireBrand.filter((e: any) => e.id_merk !== id))
      );
      setDeleted({ data: "", show: false });
      message.success(`Deleted file successfull.`);
    } catch (error) {
      message.error(`Deleted file failed.`);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...edit?.data,
    };
    try {
      await updateMasterTireBrand(JSON.stringify(payload)).then(() => {
        mutateList();
        setEdit({ data: "", show: false });
        setLoading(false);
      });
    } catch (error) {
      message.error(`${edit?.data.name} file failed.`);
      setLoading(false);
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
                // navigate("/list/brand-tire/form/" + record?.id_merk);
                const data = dataTireBrand.find(
                  (e: any) => e.id_merk === record?.id_merk
                );
                setEdit({
                  show: true,
                  data: {
                    name: data?.merk,
                    id: data?.id_merk,
                    icon: data?.icon,
                  },
                });
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
                const data = dataTireBrand.find(
                  (e: any) => e.id_merk === record?.id_merk
                );
                setDeleted({
                  show: true,
                  data: {
                    name: data?.merk,
                    id: data?.id_merk,
                  },
                });
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
          // onChange={(e: any, i: any) => {}}
        />
      </Card>
      <Modal
        open={deleted?.show}
        title={`Delete Merk Ban - ${deleted?.data?.name}`}
        onCancel={() => setDeleted({ data: "", show: false })}
        footer={[
          <Button
            key="back"
            onClick={() => setDeleted({ data: "", show: false })}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={() => onDelete(deleted?.data.id)}
            disabled={_isEmpty(deleted?.data?.name) && _isEmpty(deleted?.data)}
            style={{ backgroundColor: "red", color: "#fff" }}
          >
            Submit
          </Button>,
        ]}
      >
        Apakah anda yakin ?
      </Modal>
      <Modal
        open={edit?.show}
        title="Edit Brand Motor"
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
              _isEmpty(edit?.data?.name) && _isEmpty(edit?.data?.ranking)
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
                ID Brand
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                disabled={true}
                value={edit?.data?.id}
                placeholder="Masukkan id brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Brand Name
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, name: e.target.value },
                  }))
                }
                disabled={loading}
                value={edit?.data?.name}
                placeholder="Masukkan nama brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Ranking
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                value={edit?.data?.ranking}
                onChange={(e) =>
                  setEdit((prev: any) => ({
                    ...prev,
                    data: { ...edit?.data, ranking: Number(e.target.value) },
                  }))
                }
                disabled={loading}
                placeholder="Masukkan ranking brand"
                type="number"
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

export default withProtectedPage(BrandBan);
