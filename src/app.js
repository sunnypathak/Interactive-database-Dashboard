const app = {
  view: () => {
    return m("div", [m(TableWrapper)]);
  },
};

m.mount(document.body, app);
