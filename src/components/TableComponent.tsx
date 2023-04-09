import { Table } from "antd";
import { useState } from "react";

const TableComponent = (props: {
  columns: any[] | undefined;
  data?: readonly any[] | undefined;
  currentPage?: number;
  onChange?: any;
  total?: number;
  pagination?: boolean | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  return (
    <>
      <Table
        bordered
        columns={props.columns}
        dataSource={props.data}
        pagination={
          !props.pagination
            ? false
            : {
                defaultPageSize: 10,
                total: props.total,
                defaultCurrent: 1,
                showTotal: (total: number) => `Total Data: ${total}`,
                current: currentPage,
                onChange: (page: number, size: number) => {
                  props.onChange(page, size);
                  setCurrentPage(page);
                },
              }
        }
        scroll={{ x: true }}
      />
    </>
  );
};
export default TableComponent;
