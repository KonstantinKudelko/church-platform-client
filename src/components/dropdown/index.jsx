import { createElement, createRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import "@left4code/tw-starter/dist/js/dropdown";
import PropTypes from "prop-types";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useLocation } from "react-router-dom";

const init = (el, props) => {
  const dropdown = tailwind.Dropdown.getOrCreateInstance(el);
  setTimeout(() => {
    const isDropdownShowed = dom(el).find("[data-dropdown-replacer]").length;
    if (props.show && !isDropdownShowed) {
      dropdown.show();
    } else if (!props.show && isDropdownShowed) {
      dropdown.hide();
    }
  });

  if (el["__initiated"] === undefined) {
    el["__initiated"] = true;

    el.addEventListener("show.tw.dropdown", () => {
      props.onShow();
    });

    el.addEventListener("shown.tw.dropdown", () => {
      props.onShown();
    });

    el.addEventListener("hide.tw.dropdown", () => {
      props.onHide();
    });

    el.addEventListener("hidden.tw.dropdown", () => {
      props.onHidden();
    });
  }
};

// Dropdown wrapper
const dropdownRefContext = createContext();
export const Dropdown = (props) => {
  const dropdownRef = createRef();
  const dropdownRefTemp = createRef();
  const location = useLocation();

  // On prop change
  useEffect(() => {
    dropdownRefTemp.current = dropdownRef.current;
    init(dropdownRef.current, props);

    // Hide dropdown when component unmount
    return () => {
      tailwind.Dropdown.getOrCreateInstance(dropdownRefTemp.current).hide();
    };
  }, [props.show, location]);

  return createElement(
    dropdownRefContext.Provider,
    {
      value: dropdownRef,
    },
    createElement(
      "div",
      {
        className: `dropdown ${props.className}`,
        ref: dropdownRef,
        "data-tw-placement": props.placement,
      },
      typeof props.children === "function"
        ? props.children({
            dismiss: () => {
              tailwind.Dropdown.getOrCreateInstance(dropdownRef.current).hide();
            },
          })
        : props.children,
    ),
  );
};

Dropdown.propTypes = {
  show: PropTypes.bool,
  placement: PropTypes.string,
  onShow: PropTypes.func,
  onShown: PropTypes.func,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
};

Dropdown.defaultProps = {
  show: false,
  placement: "bottom-end",
  onShow: () => {},
  onShown: () => {},
  onHide: () => {},
  onHidden: () => {},
};

// Dropdown toggle
export const DropdownToggle = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { tag, href, ...computedProps } = props;
  return createElement(
    props.tag,
    {
      ...computedProps,
      className: `dropdown-toggle cursor-pointer ${props.className}`,
      "aria-expanded": false,
      "data-tw-toggle": "dropdown",
    },
    props.children,
  );
};

DropdownToggle.propTypes = {
  tag: PropTypes.string,
};

DropdownToggle.defaultProps = {
  tag: "button",
};

// Dropdown menu
export const DropdownMenu = (props) => {
  const dropdownRef = useContext(dropdownRefContext);
  const dropdownMenuRef = createRef();

  useEffect(() => {
    dom(dropdownMenuRef.current).appendTo(dropdownRef.current);
  }, [dropdownRef]);

  return createPortal(
    createElement(
      "div",
      {},
      createElement(
        "div",
        {
          className: `dropdown-menu ${props.className}`,
          ref: dropdownMenuRef,
        },
        props.children,
      ),
    ),
    dom("body")[0],
  );
};

// Dropdown content
export const DropdownContent = (props) => {
  return createElement(
    props.tag,
    {
      className: `dropdown-content ${props.className}`,
    },
    props.children,
  );
};

DropdownContent.propTypes = {
  tag: PropTypes.string,
};

DropdownContent.defaultProps = {
  tag: "ul",
};

// Dropdown item
export const DropdownItem = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { tag, className, ...computedProps } = props;
  return createElement(
    "li",
    {
      ...computedProps,
    },
    createElement(
      props.tag,
      {
        className: `dropdown-item cursor-pointer ${props.className}`,
      },
      props.children,
    ),
  );
};

DropdownItem.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
};

DropdownItem.defaultProps = {
  tag: "a",
  className: "",
};

// Dropdown divider
export const DropdownDivider = (props) => {
  return createElement(
    "li",
    {},
    createElement(
      props.tag,
      {
        className: `dropdown-divider ${props.className}`,
      },
      props.children,
    ),
  );
};

DropdownDivider.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
};

DropdownDivider.defaultProps = {
  tag: "hr",
  className: "",
};
