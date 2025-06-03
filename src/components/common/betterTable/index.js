/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-12 18:49:07
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-12-10 16:10:30
 * @FilePath: /askone-manage-pc/src/components/common/betterTable/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React from 'react';
import PropTypes from 'prop-types';
// import { Table, Pagination } from 'dpl-react';
import Table from 'react-better-table'; 
import 'react-better-table/dist/index.css';


const BetterTable = ({ pagination, className, dataSource, ...rest }) => {
  // console.log('rest', rest, pagination);
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

  const onChange = onPageChange || defaultChangePage

  const sortChange = (column, columnDataIndex, order) => {
    console.log('sortChange', column, columnDataIndex, order);
    const sorter = {
      column: column,
      order: order,
      field: columnDataIndex,
      columnKey: columnDataIndex,
    }
    rest.onChange(null, null, sorter);
  }
  const defaultPagination = {
    defaultCurrent: 0,
    showTotalInfo: true,
    showQuickJumper: true,
    showSizeChanger: true,
    current: parseInt(current) || 1,
    pageSize: parseInt(pageSize) || 10,
    total: total || 0,
    pageSizeOptions: pageSizeOptions || defaultSizeOption,
    onChange: onChange,
    onShowSizeChange: onChange,
  };

  return (
    <div className={className}>
      <Table
        {...rest}
        data={dataSource}
        onSortChange={sortChange}
        defaultMinWidthForColumn={100}
        pagination={pagination.noPage ? false : defaultPagination}
      />
    </div>
  );
};

BetterTable.propTypes = {
  // pagination:  PropTypes.object.isRequired ,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default BetterTable;
