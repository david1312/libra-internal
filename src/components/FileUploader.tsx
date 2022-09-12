import { useEffect, useState } from "react";
import _xorBy from "lodash/xorBy";
import { Button, message, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import _ from "lodash";

const FileUploader = ({ onData, disabled }: any) => {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function upload() {
      setLoading(true);
      fileList.map(async (e: any) => {
        if (e.originFileObj.size <= 1000000) {
          try {
            onData(e);
            setLoading(false);
            message.success(`${e.name} file added`);
          } catch (error) {
            setLoading(false);
            message.error(`${e.name} file failed.`);
          }
        } else {
          notification.error({
            message: "Error",
            description: "File size limit exceeded!",
          });
        }
      });
    }
    if (fileList.length > 0) {
      upload();
    }
  }, [fileList]);

  const fileType = "image/apng, image/jpg, image/jpeg, image/pjpeg, image/png";

  return (
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
        disabled={disabled}
      >
        {fileList?.length < 1 && (
          <>
            <Button icon={<UploadOutlined />} loading={loading}>
              Click to Upload **
            </Button>
          </>
        )}
      </Upload>
    </div>
  );
};

export default FileUploader;
