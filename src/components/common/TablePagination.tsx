import { Col, Row } from "antd";

const TablePagination = ({
  paginationData,
  onFetchSales,
  query,
  onPrevPagination,
  listPaging,
  onNextPagination,
}: any) => {
  const lastStyle = paginationData.max_page - paginationData.cur_page <= 2;

  const bigListPaging = [1, 2, 3, 4, 5, 6];
  const middlePaging = listPaging.filter((val: any) => {
    return (
      val >= paginationData.cur_page - 2 && val < paginationData.cur_page + 5
    );
  });
  const lastPaging = listPaging.filter((val: any) => {
    return val >= paginationData.max_page - 5;
  });

  if (listPaging.length === 0) {
    return <></>;
  }
  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <Col
          span={1}
          style={{
            border: "1px solid black",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onFetchSales(20, 1, query.startDate, query.endDate)}
        >
          First
        </Col>
        {}
        <Col
          span={1}
          style={{
            border: "1px solid black",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onPrevPagination()}
        >
          {`<`}
        </Col>
        {/* if paging bigger than six and curr <= 3 */}
        {paginationData.cur_page &&
          paginationData.max_page > 6 &&
          paginationData.max_page != 0 &&
          paginationData.cur_page <= 3 &&
          bigListPaging.map((val: number, index: number) => {
            if (index === 4) {
              return (
                <Col
                  key={`paging${index}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  ...
                </Col>
              );
            }
            if (index === 5) {
              return (
                <Col
                  key={`paging${paginationData.max_page}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                  className={
                    val === paginationData.cur_page
                      ? "paging-active"
                      : "paging-clickable"
                  }
                  onClick={() => {
                    if (val !== paginationData.cur_page) {
                      onFetchSales(
                        20,
                        paginationData.max_page,
                        query.startDate,
                        query.endDate
                      );
                    }
                  }}
                >
                  {paginationData.max_page}
                </Col>
              );
            }
            return (
              <Col
                key={`paging${index}`}
                span={1}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
                className={
                  val === paginationData.cur_page
                    ? "paging-active"
                    : "paging-clickable"
                }
                onClick={() => {
                  if (val !== paginationData.cur_page) {
                    onFetchSales(20, val, query.startDate, query.endDate);
                  }
                }}
              >
                {val}
              </Col>
            );
          })}
        {/* if paging bigger than 6 and middle style */}
        {paginationData.cur_page &&
          paginationData.max_page > 6 &&
          paginationData.max_page != 0 &&
          !lastStyle &&
          paginationData.cur_page > 3 &&
          middlePaging.map((val: number, index: number) => {
            if (index === 0) {
              return (
                <Col
                  key={`pagingFirst${index}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    onFetchSales(20, 1, query.startDate, query.endDate)
                  }
                >
                  1
                </Col>
              );
            }
            if (index === 1 || index === 5) {
              return (
                <Col
                  key={`pagingDot${index}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  ...
                </Col>
              );
            }
            if (index === 6) {
              return (
                <Col
                  key={`paging${paginationData.max_page}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                  className={
                    val === paginationData.cur_page
                      ? "paging-active"
                      : "paging-clickable"
                  }
                  onClick={() => {
                    if (val !== paginationData.cur_page) {
                      onFetchSales(
                        20,
                        paginationData.max_page,
                        query.startDate,
                        query.endDate
                      );
                    }
                  }}
                >
                  {paginationData.max_page}
                </Col>
              );
            }
            return (
              <Col
                key={`paging${val}`}
                span={1}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
                className={
                  val === paginationData.cur_page
                    ? "paging-active"
                    : "paging-clickable"
                }
                onClick={() => {
                  if (val !== paginationData.cur_page) {
                    onFetchSales(20, val, query.startDate, query.endDate);
                  }
                }}
              >
                {val}
              </Col>
            );
          })}
        {/* if paging bigger than 6 and last style */}
        {paginationData.cur_page &&
          paginationData.max_page > 6 &&
          paginationData.max_page != 0 &&
          lastStyle &&
          lastPaging.map((val: number, index: number) => {
            if (index === 0) {
              return (
                <Col
                  key={`paging${index}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    onFetchSales(20, 1, query.startDate, query.endDate)
                  }
                >
                  1
                </Col>
              );
            }
            if (index === 1) {
              return (
                <Col
                  key={`paging${index}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  ...
                </Col>
              );
            }
            if (index >= 2) {
              return (
                <Col
                  key={`paging${val}`}
                  span={1}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                  className={
                    val === paginationData.cur_page
                      ? "paging-active"
                      : "paging-clickable"
                  }
                  onClick={() => {
                    if (val !== paginationData.cur_page) {
                      onFetchSales(20, val, query.startDate, query.endDate);
                    }
                  }}
                >
                  {val}
                </Col>
              );
            }
            return (
              <Col
                key={`paging${index}`}
                span={1}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
                className={
                  val === paginationData.cur_page
                    ? "paging-active"
                    : "paging-clickable"
                }
                onClick={() => {
                  if (val !== paginationData.cur_page) {
                    onFetchSales(20, val, query.startDate, query.endDate);
                  }
                }}
              >
                {val}
              </Col>
            );
          })}
        {/* if paging less or equal  six */}
        {paginationData.cur_page &&
          paginationData.max_page <= 6 &&
          paginationData.max_page != 0 && (
            <>
              {listPaging.map((val: number, index: number) => {
                return (
                  <Col
                    key={`paging${index}`}
                    span={1}
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                    className={
                      val === paginationData.cur_page
                        ? "paging-active"
                        : "paging-clickable"
                    }
                    onClick={() => {
                      if (val !== paginationData.cur_page) {
                        onFetchSales(20, val, query.startDate, query.endDate);
                      }
                    }}
                  >
                    {val}
                  </Col>
                );
              })}
            </>
          )}
        <Col
          span={1}
          style={{
            border: "1px solid black",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onNextPagination()}
        >
          {`>`}
        </Col>
        <Col
          span={1}
          style={{
            border: "1px solid black",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            onFetchSales(
              20,
              paginationData.max_page,
              query.startDate,
              query.endDate
            )
          }
        >
          Last
        </Col>
      </Row>
    </>
  );
};

export default TablePagination;
