import PropTypes from "prop-types";
import { createElement } from "react";
import * as lucideIcons from "lucide-react";

export const LoadingIcon = () => {
  return (
    <span className="ml-2">
      <svg
        width="25"
        viewBox="-2 -2 42 42"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
        className="w-full h-full"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="4">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </span>
  );
};

export const Icon = ({ icon, className, ...props }) => {
  try {
    if (lucideIcons[icon]) {
      return createElement(lucideIcons[icon], {
        ...props,
        className: `lucide ${className}`,
      });
    } else {
      throw icon;
    }
  } catch (err) {
    throw `Lucide icon '${icon}' not found.`;
  }
};

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  icon: "",
  className: "",
};
