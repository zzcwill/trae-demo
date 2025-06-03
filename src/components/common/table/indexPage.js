import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'dpl-react';

const AppTable = ({ className, pageIndex, total, onPageChange, pageSize, pageSizeOptions, ...rest }) => {
  const defaultSizeOption = ["10", "20", "50", "100"]
  return (
    <div className={className}>
      <Table
        pagination={false}
        {...rest}
      />
      <div className="pagination-box">
        <Pagination
          showTotalInfo={true}
          current={parseInt(pageIndex)}
          pageSize={parseInt(pageSize) || 10}
          total={total}
          showQuickJumper={true}
          showSizeChanger={true}
          pageSizeOptions={pageSizeOptions || defaultSizeOption}
          onChange={onPageChange}
          onShowSizeChange={onPageChange}
        />
      </div>
    </div>
  );
};

AppTable.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default AppTable;