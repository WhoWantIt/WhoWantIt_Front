import axios from "axios";

const API_BASE_URL = "http://13.209.33.88:8080"; // 실제 API URL

// 1. 클라우드 펀딩 스크랩 삭제 (관리자)
export const deleteFundingScrap = async (fundingId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/fundings/scraps/${fundingId}`);
  return response.data;
};
