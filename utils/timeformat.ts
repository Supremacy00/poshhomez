import { formatDistanceToNowStrict } from "date-fns";

export const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNowStrict(date, { addSuffix: true });
  };