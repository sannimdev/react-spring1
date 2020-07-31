const defaultValue = {
  rows: 10,
  block: 10,
};

const Pager = {
  getPageStartNumber: (currentPage, rows = defaultValue.rows) => (currentPage - 1) * rows + 1,
  paging: (currentPage, totalPage, block = defaultValue.block) => {
    let first = Math.floor(currentPage / block) * block + 1;
    if (currentPage % block === 0) {
      //나누어 떨어지면 마지막 값 보정
      first -= block;
    }
    const last = first + block > totalPage ? totalPage : first + block - 1;
    const page = [];

    for (let i = first; i <= last; i++) {
      page.push(i);
    }
    return page;
  },
};

export default Pager;
