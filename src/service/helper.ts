import axios from "axios";

export const getBulkData = async (urls: string[]) => {
  const bulkPromise = urls.map((url) => axios.get(url));
  return await Promise.all(bulkPromise);
};