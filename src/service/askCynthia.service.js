const { post } = require("@/web.request");

export const searchQuerryHandle = (data) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  return post(`${apiUrl}/qna`, data);
};
