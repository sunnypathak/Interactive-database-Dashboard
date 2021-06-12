const TableWrapperView = {
  view: () => {
    return m(
      "div",
      { id: "main-table-div" },
      DataHelper.filteredData.map((arrElement, index) => {
        return m(DataTable, { rowElement: arrElement, elementInd: index });
      })
    );
  },
};

const filterView = {
  view: () => {
    if (DataHelper.filter.length > 0) {
      return m(
        "div",
        { id: "filter-div" },
        m(
          "span",
          { id: "clear-filter", onclick: () => DataHelper.clearFilter() },
          "Clear Filter"
        ),
        DataHelper.filter.map((obj) => {
          return m("div", [m("span", obj["key"] + ":" + obj["value"])]);
        })
      );
    }
    return m("div", { id: "filter-div" }, "Click on any column to filter Data");
  },
};

const TableWrapper = {
  view: () => {
    return m("div", m(filterView), m(TableWrapperView));
  },
};
