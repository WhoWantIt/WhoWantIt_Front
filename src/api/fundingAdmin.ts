import axios from "axios";
const api = import.meta.env.VITE_API_URL;
const API_BASE_URL = api;

// 1. 클라우드 펀딩 스크랩 삭제 (관리자)
export const deleteFundingScrap = async (fundingId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/fundings/scraps/${fundingId}`);
  return response.data;
};
