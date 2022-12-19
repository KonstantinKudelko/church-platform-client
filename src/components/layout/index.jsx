import classnames from "classnames";
import { Icon } from "@/components";
import { useState } from "react";
import { Transition } from "react-transition-group";
import { helper as $h } from "@/utils";
import { linkTo, enter, leave } from "./layout.helper";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const [formattedMenu, setFormattedMenu] = useState([
    {
      icon: "Briefcase",
      title: "Home",
      pathname: "/home",
    },
  ]);

  return (
    <div className="xl:pl-5 xl:py-5 flex h-screen">
      {/* BEGIN: Side Menu */}
      <nav
        className={classnames({
          "side-nav": true,
        })}
      >
        <div className="pt-4 mb-4">
          <div className="side-nav__header flex items-center">
            <Link to="/" className="intro-x flex items-center">
              <span className="side-nav__header__text pt-0.5 text-lg ml-2.5">Client Platform</span>
            </Link>
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
      </nav>
      {/* END: Side Menu */}
      {/* BEGIN: Content */}
      <div
        className={classnames({
          wrapper: true,
          // "wrapper--simple": simpleMenu.wrapper,
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
