import dom from "@left4code/tw-starter/dist/js/dom";

// Setup side menu
const findActiveMenu = (subMenu, location) => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((location.forceActiveMenu !== undefined && item.pathname === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined && item.pathname === location.pathname)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu, location) => {
  menu.forEach((item, key) => {
    if (typeof item !== "string") {
      let menuItem = menu[key];
      const rawPathname = item.pathname.split("/")[1];

      menuItem.active =
        ((location.forceActiveMenu !== undefined && item.pathname === location.forceActiveMenu) ||
          (location.forceActiveMenu === undefined &&
            location.pathname.split("/").includes(rawPathname)) ||
          (item.subMenu && findActiveMenu(item.subMenu, location))) &&
        !item.ignore;

      if (item.subMenu) {
        menuItem.activeDropdown = findActiveMenu(item.subMenu, location);
        menuItem = {
          ...item,
          ...nestedMenu(item.subMenu, location),
        };
      }
    }
  });

  return menu;
};

const linkTo = (menu, navigate) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    navigate(menu.pathname);
  }
};

const enter = (el) => {
  dom(el).slideDown(300);
};

const leave = (el) => {
  dom(el).slideUp(300);
};

export { nestedMenu, linkTo, enter, leave };
