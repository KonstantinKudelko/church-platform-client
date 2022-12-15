import classnames from "classnames";
import {
  ERROR_WORKSPACE_STATUS,
  NOT_AUTH_WORKSPACE_STATUS,
  PROGRESS_WORKSPACE_STATUS,
  AUTHORIZED_WORKSPACE_STATUS,
} from "@/constants";

export const WORKSPACES_STATUSES = Object.freeze({
  AUTH_ERROR() {
    return {
      value: ERROR_WORKSPACE_STATUS,
      element: (
        <span className="text-xs whitespace-nowrap text-danger bg-danger/20 border border-danger/20 rounded-full px-2 py-1 cursor-pointer">
          Error
        </span>
      ),
    };
  },
  AUTHORIZED(isEnabled) {
    return {
      value: AUTHORIZED_WORKSPACE_STATUS,
      element: (
        <span
          className={classnames(
            "text-xs whitespace-nowrap text-danger border rounded-full px-2 py-1 cursor-pointer",
            { "text-success bg-success/20 border-success/20": isEnabled },
            { "text-dark bg-dark/20 border-dark/20": !isEnabled },
          )}
        >
          {isEnabled ? "Watching" : "Disabled"}
        </span>
      ),
    };
  },
  NOT_AUTH() {
    return {
      value: NOT_AUTH_WORKSPACE_STATUS,
      element: (
        <span className="text-xs whitespace-nowrap text-dark bg-dark/20 border border-dark/20 rounded-full px-2 py-1 cursor-pointer">
          Not authorised
        </span>
      ),
    };
  },
  AUTH_IN_PROGRESS() {
    return {
      value: PROGRESS_WORKSPACE_STATUS,
      element: (
        <span className="text-xs whitespace-nowrap text-warning bg-warning/20 border border-warning/20 rounded-full px-2 py-1 cursor-pointer">
          Authorizing
        </span>
      ),
    };
  },
});
