import { USER_ROLES } from "@/constants";
import { atom, selector } from "recoil";

export const userAtom = atom({
  key: "user",
  default: JSON.parse(localStorage.getItem("user")),
});

export const isRoleSelector = selector({
  key: "user-role-selector",
  get: ({ get }) => {
    const user = get(userAtom);
    const isAdmin = user.role === USER_ROLES.ADMIN;
    const isSales = user.role === USER_ROLES.SALES;

    return {
      isAdmin,
      isSales,
      isOperations: user.role === USER_ROLES.OPERATIONS,
      isAdminOrSales: isAdmin || isSales,
    };
  },
});
