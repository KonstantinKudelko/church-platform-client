export const getWorkspacesFieldsOptions = (field, workspaces) =>
  workspaces
    .filter((workspace) => workspace[field])
    .map((workspace) => workspace[field])
    .filter((option, index, options) => options.indexOf(option) === index)
    .map((workspace) => ({ label: workspace, value: workspace }));
