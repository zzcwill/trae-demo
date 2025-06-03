import React from "react";
import "./index.scss";
import classnames from "classnames";
function BrandTable(props, ref) {
  const { className, style, columns, dataSource, optionComponent } = props;
  const bodyClass = classnames({
    "brand-table-box": true,
    [className]: className,
  });
  const tableHeadClass = (item) => {
    return classnames({
      "table-head-title": true,
      "table-head-title-center": item.center,
    });
  };
  const tableBodyClass = (item) => {
    return classnames({
      "table-body-item": true,
      "table-body-item-center": item.center,
    });
  };
  return (
    <div className={bodyClass} style={style} ref={ref}>
      <div className="table-data-box">
        <ul className="table-head table-item">
          {columns &&
            columns.length > 0 &&
            columns.map((item, index) => {
              return (
                <li
                  key={item.dataIndex || index}
                  className={tableHeadClass(item)}
                  style={item.width ? { width: `${item.width}px` } : null}
                >
                  {item.title}
                </li>
              );
            })}
        </ul>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((data, outIndex) => {
            return (
              <ul className="table-body table-item" key={outIndex}>
                {columns &&
                  columns.length > 0 &&
                  columns.map((item, index) => {
                    return (
                      <li
                        key={item.dataIndex || index}
                        className={tableBodyClass(item)}
                        style={item.width ? { width: item.width } : null}
                      >
                        {!item.render && (
                          <span title={data[item.dataIndex]}>
                            {data[item.dataIndex]}
                          </span>
                        )}
                        {item.render && item.render(data[item.dataIndex], data)}
                      </li>
                    );
                  })}
              </ul>
            );
          })}
      </div>
      {optionComponent && (
        <div className="course-option-box">{optionComponent(dataSource)}</div>
      )}
    </div>
  );
}

export default React.forwardRef(BrandTable);
