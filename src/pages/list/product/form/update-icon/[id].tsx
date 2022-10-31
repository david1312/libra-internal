import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Image, Input, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import _isEmpty from "lodash/isEmpty";
import FileUploader from "@/components/FileUploader";
import { imageProduct } from "@/services/product";
import qs from "qs";

const BrandBan = () => {
  const params: any = useParams();
  const hash: any = qs.parse(window.location.hash.slice(1));
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("id_image", params?.id);

      form?.data?.map((e: any) => {
        data.append("icon", e.originFileObj);
      });
      await imageProduct("UPDATE", data).then(() => {
        navigate("/list/product/" + hash?.id);
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
      setLoading(false);
    }
  };

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
        <h2 className="m-0 text-[#000] font-bold">Update Image </h2>
        <Image src={hash?.url} width="250px" />
        <br />
        <table width={"100%"} cellPadding={8}>
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
                  disabled={_isEmpty(form?.data)}
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
