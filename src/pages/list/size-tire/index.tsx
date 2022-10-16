import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Divider, Button, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";
import { getMasterTireSize, removeMasterSize } from "@/services/master";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const BrandBan = () => {
  const { dataTireSize, mutateList } = getMasterTireSize();
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const columns = [
    // {
    //   title: "NO",
    //   dataIndex: "no",
    //   key: "no",
    //   width: 50,
    // },
    {
      title: "RING BAN",
      dataIndex: "ring_ban",
      key: "ring_ban",
      width: 100,
    },
    {
      title: "LIST UKURAN",
      dataIndex: "list_ukuran",
      key: "list_ukuran",
      render: (_: any, record: any) => (
        <>
          {record?.list_ukuran?.map((e: any) => {
            return (
              <Button style={{ width: 115, marginRight: 8 }}>
                {e.ukuran} <DeleteOutlined onClick={() => onDelete(e.ukuran)} />
              </Button>
            );
          })}
        </>
      ),
    },
  ];

  const onDelete = async (id: any) => {
    const payload = {
      id: id,
    };
    try {
      await removeMasterSize(payload).then(() => mutateList());
      message.success(`Deleted file successfull.`);
    } catch (error) {
      message.error(`Deleted file failed.`);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/size-tire">Daftar Ukuran Ban</NavLink>
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
                onClick={() => navigate(currentPath + "/form")}
              >
                Add New Size
              </Button>
            </span>
          </td>
        </tr>
      </table>

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={dataTireSize?.map((e: any, i: number) => ({ ...e, no: i + 1 }))}
          pagination={true}
          onChange={(e: any, i: any) => {}}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
