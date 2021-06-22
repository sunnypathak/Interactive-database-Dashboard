const DataHelper = {
  data: StaticData.map((el) => el),
  filteredData: StaticData.map((el) => el),
  filter: [],
  pagination: [],
  filterApplied: false,
  notChecked: false,

  getDataForCurrentPage: (arr, arrInd) => {
    if (arr.length == 0) return [];

    let lastIndex =
      DataHelper.pagination[arrInd].currentPage *
      DataHelper.pagination[arrInd].recordsPerPage;

    lastIndex =
      lastIndex > DataHelper.pagination[arrInd].totalRecords
        ? DataHelper.pagination[arrInd].totalRecords
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

  getFilteredData: (columnsArr, rowObj, index) => {
    Object.values(rowObj).forEach((el, ind) => {
      DataHelper.filter.push({
        key: columnsArr[ind],
        value: el,
      });
    });

    const clickedKey = columnsArr[index].split(' ').join('_');
    const clickedVal = rowObj[clickedKey];

    DataHelper.filter.forEach((filterObj) => {
      const keyName = filterObj.key.split(' ').join('_');
      DataHelper.filteredData = DataHelper.filteredData.map(
        (arrElement, index) => {
          if (document.getElementById(`select-${index}`).checked) {
            DataHelper.filterApplied = true;
            if (arrElement.length > 0 && arrElement[0][clickedKey]) {
              return arrElement.filter((obj) => obj[clickedKey] === clickedVal);
            } else if (arrElement.length > 0 && arrElement[0][keyName]) {
              return arrElement.filter(
                (obj) => obj[keyName] === filterObj.value
              );
              // let to = 0;
              // arrElement.forEach((obj) => {
              //   if (obj[keyName] === filterObj.value) {
              //     arrElement[to] = obj;
              //     to += 1;
              //   }
              // });

              // arrElement.length = to;

              // return arrElement;
            }
          }
          return arrElement;
        }
      );
    });

    if (!DataHelper.filterApplied) {
      DataHelper.filter = [];
      DataHelper.notChecked = true;
    }
  },

  clearFilter: () => {
    DataHelper.filteredData = StaticData;
    DataHelper.filter = [];
    DataHelper.notChecked = false;
  },

  getHeader: (arr) => {
    const result = [];
    arr.map((el) => {
      const elSplit = el.split('_');
      result.push(elSplit.join(' '));
    });
    return result;
  },
  paginationArr: [],
};
