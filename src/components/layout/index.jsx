import dom from "@left4code/tw-starter/dist/js/dom";
import SimpleBar from "simplebar";
import classnames from "classnames";
import { Transition } from "react-transition-group";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "@/stores/user";
import { menuSelector } from "@/stores/menu";
import { useState, useEffect } from "react";
import { useCallbackState, helper as $h } from "@/utils";
import { linkTo, nestedMenu, enter, leave } from "./layout.helper";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  DropdownContent,
} from "@/components";

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const [formattedMenu, setFormattedMenu] = useState([]);
  const sideMenuStore = useRecoilValue(menuSelector);
  const sideMenu = () => nestedMenu($h.toRaw(sideMenuStore.menu), location);
  const [simpleMenu, setSimpleMenu] = useCallbackState({
    active: false,
    hover: false,
    wrapper: false,
  });
  const [mobileMenu, setMobileMenu] = useState(false);

  // Set active/inactive simple menu
  const toggleSimpleMenu = (event) => {
    event.preventDefault();

    if (simpleMenu.active) {
      setSimpleMenu({
        ...simpleMenu,
        hover: true,
      });
    } else {
      setSimpleMenu({
        ...simpleMenu,
        active: true,
        wrapper: true,
      });
    }
  };

  // Set active/inactive mobile menu
  const toggleMobileMenu = (event) => {
    event.preventDefault();
    setMobileMenu(!mobileMenu);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    new SimpleBar(dom(".side-nav .scrollable")[0]);
    new SimpleBar(dom(".content")[0]);
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <div className="xl:pl-5 xl:py-5 flex h-screen">
      {/* BEGIN: Side Menu */}
      <nav
        className={classnames({
          "side-nav": true,
          "side-nav--simple": simpleMenu.active,
          hover: simpleMenu.hover,
          "side-nav--active": mobileMenu,
        })}
      >
        <div className="pt-4 mb-4">
          <div className="side-nav__header flex items-center">
            <Link to="/" className="intro-x flex items-center">
              <span className="side-nav__header__text pt-0.5 text-lg ml-2.5">
                Church Client Platform
              </span>
            </Link>
            <a
              href="#"
              onClick={toggleSimpleMenu}
              className="side-nav__header__toggler hidden xl:block ml-auto text-primary dark:text-slate-500 text-opacity-70 hover:text-opacity-100 transition-all duration-300 ease-in-out pr-5"
            >
              <Icon icon="ArrowLeftCircle" className="w-5 h-5" />
            </a>
            <a
              href="#"
              onClick={toggleMobileMenu}
              className="mobile-menu-toggler xl:hidden ml-auto text-primary dark:text-slate-500 text-opacity-70 hover:text-opacity-100 transition-all duration-300 ease-in-out pr-5"
            >
              <Icon icon="XCircle" className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="scrollable">
          <ul className="scrollable__content">
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              typeof menu === "string" ? (
                <li className="side-nav__devider mb-4" key={menu + menuKey}>
                  {menu}
                </li>
              ) : (
                <li key={menu + menuKey}>
                  <a
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": menu.active,
                      "side-menu--open": menu.activeDropdown,
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                      setFormattedMenu($h.toRaw(formattedMenu));
                    }}
                  >
                    <div className="side-menu__icon">
                      <Icon icon={menu.icon} />
                    </div>
                    <div className="side-menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <div
                          className={classnames({
                            "side-menu__sub-icon": true,
                            "transform rotate-180": menu.activeDropdown,
                          })}
                        >
                          <Icon icon="ChevronDown" />
                        </div>
                      )}
                    </div>
                  </a>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={classnames({
                          "side-menu__sub-open": menu.activeDropdown,
                        })}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <a
                              href={subMenu.subMenu ? "#" : subMenu.pathname}
                              className={classnames({
                                "side-menu": true,
                                "side-menu--active": subMenu.active,
                              })}
                              onClick={(event) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu($h.toRaw(formattedMenu));
                              }}
                            >
                              <div className="side-menu__icon">
                                <Icon icon="Activity" />
                              </div>
                              <div className="side-menu__title">
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <div
                                    className={classnames({
                                      "side-menu__sub-icon": true,
                                      "transform rotate-180": subMenu.activeDropdown,
                                    })}
                                  >
                                    <Icon icon="ChevronDown" />
                                  </div>
                                )}
                              </div>
                            </a>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={classnames({
                                    "side-menu__sub-open": subMenu.activeDropdown,
                                  })}
                                >
                                  {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                                    <li key={lastSubMenuKey}>
                                      <a
                                        href={lastSubMenu.subMenu ? "#" : lastSubMenu.pathname}
                                        className={classnames({
                                          "side-menu": true,
                                          "side-menu--active": lastSubMenu.active,
                                        })}
                                        onClick={(event) => {
                                          event.preventDefault();
                                          linkTo(lastSubMenu, navigate);
                                        }}
                                      >
                                        <div className="side-menu__icon">
                                          <Icon icon="Zap" />
                                        </div>
                                        <div className="side-menu__title">{lastSubMenu.title}</div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              ),
            )}
            {/* END: First Child */}
          </ul>
        </div>

        <div className="flex py-6 pl-4">
          <Dropdown className="intro-x h-12" placement="top-start">
            <DropdownToggle
              tag="div"
              role="button"
              className="h-full dropdown-toggle flex items-center"
            >
              <Icon icon="User" className="w-8 h-8 image-fit" />

              <div className="hidden md:block ml-1">
                <div className="max-w-[7rem] truncate font-medium">{user.username}</div>
              </div>
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent>
                <DropdownItem onClick={() => onLogout()}>
                  <Icon icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
      {/* END: Side Menu */}
      {/* BEGIN: Content */}
      <div
        className={classnames({
          wrapper: true,
          "wrapper--simple": simpleMenu.wrapper,
        })}
      >
        <div className="content">
          <div className="xl:px-6 mt-2.5">
            <Outlet />
          </div>
        </div>
      </div>
      {/* END: Content */}
    </div>
  );
};
