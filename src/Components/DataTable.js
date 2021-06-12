const DataTableView = {
  view: (vnode) => {
    const { rowElement, elementInd } = vnode.attrs;
    let headers = [];
    let rowsExist = true;
    if (rowElement.length > 0) {
      headers = DataHelper.getHeader(Object.keys(rowElement[0]));
    } else {
      headers = DataHelper.getHeader(
        Object.keys(DataHelper.data[elementInd][0])
      );
      return m("table", { id: "data_table" }, [
        m(
          "tr",
          headers.map((header) => {
            return m("th.ba", header);
          })
        ),
      ]);
    }

    return m(
      "table",
      { id: "data_table" },
      rowElement.map((rowObj, index) => {
        return m("tbody", [
          index == 0
            ? headers.map((header) => {
                return m("th", header);
              })
            : null,
          rowsExist &&
            m(
              "tr",
              Object.values(rowObj).map((rowEl, index) => {
                return m(
                  "td",
                  {
                    onclick: () =>
                      DataHelper.getFilteredData(headers[index], rowEl),
                  },
                  rowEl
                );
              })
            ),
        ]);
      })
    );
  },
};

const PaginationView = {
  view: (vnode) => {
    const { elementInd } = vnode.attrs;
    let lastPage = Math.ceil(
      DataHelper.pagination[elementInd].totalRecords /
        DataHelper.pagination[elementInd].recordsPerPage
    );
    lastPage = lastPage != 0 ? lastPage : 1;
    return m("div", { id: "pagination-div" }, [
      m("div", { id: "prev-div" }, [
        m("span", { onclick: () => DataHelper.getFirstPage(elementInd) }, "|<"),
        m("span", { onclick: () => DataHelper.getPrevPage(elementInd) }, "<"),
      ]),
      m(
        "div",
        { id: "page-info" },
        "Page " +
          DataHelper.pagination[elementInd].currentPage +
          " of " +
          lastPage
      ),
      m("div", { id: "next-div" }, [
        m("span", { onclick: () => DataHelper.getNextPage(elementInd) }, ">"),
        m("span", { onclick: () => DataHelper.getLastPage(elementInd) }, ">|"),
      ]),
    ]);
  },
};

const DataTable = {
  view: (vnode) => {
    const { rowElement, elementInd } = vnode.attrs;
    if (!DataHelper.pagination[elementInd]) {
      const paginationObj = {
        currentPage: 1,
        recordsPerPage: 5,
        totalRecords: rowElement.length,
      };
      DataHelper.pagination.push(paginationObj);
    } else {
      DataHelper.pagination[elementInd].totalRecords = rowElement.length;
      if (
        DataHelper.pagination[elementInd].totalRecords <
        DataHelper.pagination[elementInd].recordsPerPage
      ) {
        DataHelper.pagination[elementInd].currentPage = 1;
      }
    }

    const paginatedArr = DataHelper.getDataForCurrentPage(
      rowElement,
      elementInd
    );
    return m("div", [
      m(PaginationView, { elementInd: elementInd }),
      m(DataTableView, {
        rowElement: paginatedArr,
        elementInd: elementInd,
      }),
    ]);
  },
};
