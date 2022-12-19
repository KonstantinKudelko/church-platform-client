export const menu = {
  key: "menu",
  default: {
    ADMIN_MENU: [
      "Clients",
      {
        icon: "Briefcase",
        title: "Home",
        pathname: "/home",
      },
    ],
  },
};

export const updateAdminMenu = (menu, { title, counter }) => ({
  OPERATIONS_MENU: menu.OPERATIONS_MENU,
  ADMIN_MENU: menu.ADMIN_MENU.map((item) => (item?.title === title ? { ...item, counter } : item)),
});
