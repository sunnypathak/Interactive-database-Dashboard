const DataHelper = {
  data: StaticData,
  filteredData: StaticData,
  filter: [],
  pagination: [],
  filterApplied: false,
  getDataForCurrentPage: (arr, arrInd) => {
    let lastIndex =
      DataHelper.pagination[arrInd].currentPage *
      DataHelper.pagination[arrInd].recordsPerPage;
    lastIndex =
      lastIndex > DataHelper.pagination[arrInd].totalRecords
        ? DataHelper.pagination[arrInd].totalRecords - 1
        : lastIndex;
    const indMod =
      DataHelper.pagination[arrInd].totalRecords %
      DataHelper.pagination[arrInd].recordsPerPage;
    let fromIndex = lastIndex - DataHelper.pagination[arrInd].recordsPerPage;
    let lastPage = Math.ceil(
      DataHelper.pagination[arrInd].totalRecords /
        DataHelper.pagination[arrInd].recordsPerPage
    );
    let lastPageFlg = DataHelper.pagination[arrInd].currentPage === lastPage;
    if (indMod == 0) {
      fromIndex = lastIndex - DataHelper.pagination[arrInd].recordsPerPage;
    } else if (lastPageFlg) {
      fromIndex = lastIndex - indMod;
    }

    fromIndex = fromIndex > 0 ? fromIndex : 0;
    if (arr.length == 1) return arr;
    return arr.slice(fromIndex, lastIndex);
  },

  getNextPage: (arrInd) => {
    const increasedPageNo = DataHelper.pagination[arrInd].currentPage + 1;
    const totalPages = Math.ceil(
      DataHelper.pagination[arrInd].totalRecords /
        DataHelper.pagination[arrInd].recordsPerPage
    );

    if (totalPages < increasedPageNo) return;

    DataHelper.pagination[arrInd].currentPage = increasedPageNo;
  },

  getPrevPage: (arrInd) => {
    const decreasePageNo = DataHelper.pagination[arrInd].currentPage - 1;
    if (decreasePageNo < 1) return;

    DataHelper.pagination[arrInd].currentPage = decreasePageNo;
  },

  getFirstPage: (arrInd) => {
    DataHelper.pagination[arrInd].currentPage = 1;
  },

  getLastPage: (arrInd) => {
    DataHelper.pagination[arrInd].currentPage = Math.ceil(
      DataHelper.pagination[arrInd].totalRecords /
        DataHelper.pagination[arrInd].recordsPerPage
    );
  },

  getFilteredData: (columnName, value) => {
    DataHelper.filter.push({
      key: columnName,
      value: value,
    });
    DataHelper.filterApplied = true;

    const keyName = columnName.split(" ").join("_");
    const tempDataArr = DataHelper.filteredData.map((arrElement) => {
      if (arrElement.length > 0 && arrElement[0][keyName]) {
        return arrElement.filter((obj) => obj[keyName] === value);
      }
      return arrElement;
    });
    DataHelper.filteredData = tempDataArr;
  },

  clearFilter: () => {
    (DataHelper.filteredData = StaticData), (DataHelper.filter = []);
  },

  getHeader: (arr) => {
    const result = [];
    arr.map((el) => {
      const elSplit = el.split("_");
      result.push(elSplit.join(" "));
    });
    return result;
  },
  paginationArr: [],
};
