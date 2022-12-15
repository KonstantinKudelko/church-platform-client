import dom from "@left4code/tw-starter/dist/js/dom";
import SimpleBar from "simplebar";
import classnames from "classnames";
import { Icon } from "@/components";
import { Transition } from "react-transition-group";
import { menuSelector } from "@/stores/menu";
import { useRecoilValue } from "recoil";
import { useMessagesCounter } from "@/api/messages";
import { socket, queryClient } from "@/app";
import { useState, useEffect } from "react";
import { MENU_TITLES, MESSAGE_STATUSES } from "@/constants";
import { useCallbackState, helper as $h } from "@/utils";
import { linkTo, nestedMenu, enter, leave } from "./layout.helper";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesCounter = useMessagesCounter();
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

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    new SimpleBar(dom(".side-nav .scrollable")[0]);
    new SimpleBar(dom(".content")[0]);
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  useEffect(() => {
    socket.on("request", (request) => {
      queryClient.invalidateQueries(["messages-count"]);

      queryClient.setQueryData(["messages", MESSAGE_STATUSES.DRAFT], (requests) => {
        return [request, ...requests];
      });
    });

    socket.on("message", () => {
      queryClient.invalidateQueries(["messages-count"]);
    });

    return () => {
      socket.off("request");
      socket.off("message");
    };
  }, []);

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
              <span className="side-nav__header__text pt-0.5 text-lg ml-2.5">Client Platform</span>
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

                    {menu.title === MENU_TITLES.REQUESTS && messagesCounter.data?.requests > 0 && (
                      <div className="side-menu__counter">{messagesCounter.data?.requests}</div>
                    )}

                    {menu.title === MENU_TITLES.CHATS && messagesCounter.data?.unreadChats > 0 && (
                      <div className="side-menu__counter">{messagesCounter.data?.unreadChats}</div>
                    )}
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
