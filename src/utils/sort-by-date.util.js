import dayjs from "dayjs";

export const sortByDate = (entities, field) =>
  entities.sort((a, b) => (dayjs(a[field]).isBefore(dayjs(b[field])) ? 1 : -1));
