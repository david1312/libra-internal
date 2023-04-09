import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Input, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getMasterBrand, updateIconMotorBrand } from "@/services/master";
import _isEmpty from "lodash/isEmpty";
import FileUploader from "@/components/FileUploader";

const BrandBan = () => {
  const params = useParams();
  const { dataMasterBrand } = getMasterBrand();
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("id", form?.id);

      form?.data?.map((e: any) => {
        data.append("icon", e.originFileObj);
      });
      await updateIconMotorBrand(data).then(() => {
        navigate("/list/brand-motor", {
          state: {
            update: true,
          },
        });
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataMasterBrand) {
      const data = dataMasterBrand.find(
        (e: any) => e.id === Number(params?.id)
      );
      setForm({ id: data?.id });
    }
  }, [dataMasterBrand]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor">Daftar Brand Motor</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Update Icon {params?.id} </h2>
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
                value={form?.id}
                placeholder="Masukkan id brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Icon
              </span>
            </td>
            <td>:</td>
            <td>
              <FileUploader
                onData={(data: any) =>
                  setForm((prev: any) => ({ ...prev, data: data }))
                }
                disabled={loading}
                multiple={false}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <span style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={_isEmpty(form?.name) && _isEmpty(form?.data)}
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
