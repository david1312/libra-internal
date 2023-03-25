import React, { useState, useEffect } from "react";
import { Button, message, notification, Upload, Modal } from "antd";
import Icon, { DeleteOutlined } from "@ant-design/icons";
import _xorBy from "lodash/xorBy";
import { UploadOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { addMasterBrand } from "@/services/master";

const ConfirmationModal = ({ title, payload, disabled }: any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [acceptedFile, setAcceptedFile] = useState<any>();
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDeleteOk = () => {
    fileList.map(async (e: any) => {
      if (e.originFileObj.size <= 1000000) {
        try {
          let data = new FormData();
          data.append("name", payload?.name);
          data.append("icon", e.originFileObj);
          setLoading(true);
          await addMasterBrand(data).then(() => {
            setLoading(false);
            navigate("/list/brand-motor");
            setFileList([]);
            setVisible(false);
          });
          message.success(`${e.name} file uploaded successfully`);
        } catch (error) {
          setLoading(false);
          message.error(`${e.name} file upload failed.`);
        }
      } else {
        notification.error({
          message: "Error",
          description: "File size limit exceeded!",
        });
      }
    });
    setVisible(false);
  };

  const fileType = "image/apng, image/jpg, image/jpeg, image/pjpeg, image/png";

  return (
    <>
      <Button onClick={showModal} disabled={disabled} type="primary">
        Completed with Upload {title}
      </Button>
      <Modal
        title={"Upload " + title}
        open={visible}
        onOk={handleDeleteOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={1000}
      >
        <div>
          <Upload
            key="document"
            name="document"
            accept={fileType}
            fileList={fileList}
            onRemove={() => {
              setFileList([]);
            }}
            multiple={false}
            maxCount={1}
            beforeUpload={() => {
              return false;
            }}
            onChange={(file) => {
              setFileList(file.fileList);
            }}
            disabled={acceptedFile?.length > 0}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Click to Upload
            </Button>
          </Upload>
          <div className="text-red-600 mt-2">max. 1 MB</div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
