import { atom, selector } from "recoil";
import { isRoleSelector } from "./user";

export const menuAtom = atom({
  key: "menu",
  default: {
    ADMIN_MENU: [
      "Menu",
      {
        icon: "MessageCircle",
        title: "Home",
        pathname: "/home",
      },
    ],
  },
});

export const menuSelector = selector({
  key: "menu-selector",
  get: ({ get }) => {
    const menu = get(menuAtom);
    const { isAdmin, isOperations } = get(isRoleSelector);

    if (isAdmin) {
      return { menu: menu.ADMIN_MENU };
    }

    if (isOperations) {
      return { menu: menu.OPERATIONS_MENU };
    }
  },
});

export const updateAdminMenu = (menu, { title, counter }) => ({
  OPERATIONS_MENU: menu.OPERATIONS_MENU,
  ADMIN_MENU: menu.ADMIN_MENU.map((item) => (item?.title === title ? { ...item, counter } : item)),
});
