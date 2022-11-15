import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Row,
  Spin,
  Tooltip,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getDetailProduct, imageProduct } from "@/services/product";
import FileUploader from "@/components/FileUploader";
import _isEmpty from "lodash/isEmpty";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import { currencyFormat } from "@/utils/utils";

const DetailProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({});
  const { detailProduct, isLoading, mutateList } = getDetailProduct(params?.id);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("id", detailProduct?.id);

      form?.data?.map((e: any) => {
        data.append("photos", e.originFileObj);
      });
      await imageProduct("ADD", data).then(() => {
        mutateList();
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      message.error(`${form?.data.name} file failed.`);
    }
  };

  const onDelete = async (id: any) => {
    setLoading(true);
    const payload = {
      id: id,
    };
    try {
      await imageProduct("DELETE", payload).then(() => {
        mutateList();
        setLoading(false);
      });
      message.success(`Deleted file successfull.`);
    } catch (error) {
      setLoading(false);
      message.error(`Deleted file failed.`);
    }
  };

  if (isLoading || loading) return <Spin />;
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/product">Daftar Product</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail Product</Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td colSpan={3}>
              <h2 className="m-0 text-[#a70000] font-bold">Detail Product</h2>
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Nama Barang</td>
            <td>: {detailProduct?.nama_barang}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Ukuran</td>
            <td>: {detailProduct?.ukuran}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Jenis Ban</td>
            <td>: {detailProduct?.jenis_ban}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Harga Jual</td>
            <td>: Rp. {currencyFormat(detailProduct?.harga_jual_final)}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Harga Coret</td>
            <td>: Rp. {currencyFormat(detailProduct?.harga_jual_coret)}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Posisi</td>
            <td>: {detailProduct?.posisi}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Jenis Motor</td>
            <td>: {detailProduct?.jenis_motor}</td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Kompatibilitas</td>
            <td>
              :{" "}
              {detailProduct?.kompatibilitas?.map((e: any) => e.url).join(", ")}
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Produk Terjual</td>
            <td>: {detailProduct?.total_terjual}</td>
          </tr>

          <tr>
            <td></td>
            <td>
              {detailProduct?.image_list?.map((e: any) => (
                <>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={15}>
                      <Image src={e?.url} width="100%" />
                    </Col>

                    <Col className="gutter-row" span={9}>
                      <Tooltip title="Change Image" color={"#FAA21B"}>
                        <FileImageOutlined
                          onClick={() =>
                            navigate(
                              "/list/product/form/update-icon/" +
                                e?.id +
                                "#url=" +
                                e?.url +
                                "&id=" +
                                detailProduct?.id
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Delete" color="red">
                        <DeleteOutlined onClick={() => onDelete(e?.id)} />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Divider />
                </>
              ))}
            </td>
          </tr>
          <tr>
            <td className="m-0 text-[#000] font-bold">Gambar Produk</td>
            <td>
              <FileUploader
                onData={(data: any) =>
                  setForm((prev: any) => ({ ...prev, data: data }))
                }
                disabled={loading}
                multiple={true}
              />
            </td>
            <td>
              <span style={{ float: "left" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={_isEmpty(form?.data)}
                >
                  Add
                </Button>
              </span>
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
};

export default withProtectedPage(DetailProduct);
