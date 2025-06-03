import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'dpl-react';

const AppTable = ({ pagination, className, ...rest }) => {
  if(pagination == false) {
    pagination = { noPage: true }
  }

  const { current, total, onPageChange, pageSize, pageSizeOptions } = pagination;

  const defaultSizeOption = ["10", "20", "50", "100"]
  //针对useFormTableQuery拿到的table
  const defaultChangePage = (pageIndex, pageSize) => {
    const newPagination = Object.assign({}, pagination, {
      current: pageIndex,
      pageSize,
    });
    rest.onChange(newPagination, null, null);
  };

  const defaultPagination = {
    showTotalInfo: true,
    showQuickJumper: true,
    showSizeChanger: true,
    current: parseInt(current) || 1,
    pageSize: parseInt(pageSize) || 10,
    total: total || 0,
    pageSizeOptions: pageSizeOptions || defaultSizeOption,
    onChange: onPageChange || defaultChangePage,
    onShowSizeChange: onPageChange || defaultChangePage
  };

  return (
    <div className={className}>
      <Table
        pagination={false}
        {...rest}
      />
      {pagination.noPage !== true &&
        <div className="pagination-box">
          <Pagination
            {...defaultPagination}
          /> 
        </div>
      }
    </div>
    // <Table
    //   pagination={defaultPagination}
    //   {...rest}
    // />
  );
};

AppTable.propTypes = {
  // pagination:  PropTypes.object.isRequired ,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default AppTable;