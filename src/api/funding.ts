import axios from "axios";
const api = import.meta.env.VITE_API_URL;
const API_BASE_URL = api;

// 1. 전체 클라우드 펀딩 조회 (ALL)
export const getAllFundings = async () => {
  const response = await axios.get(`${API_BASE_URL}/fundings/lists`);
  return response.data.result;
};

// 2. 진행 중 / 완료된 펀딩 조회
export const getFilteredFundings = async (status: string) => {
  const response = await axios.get(`${API_BASE_URL}/fundings/filters`, {
    params: { status },
  });
  return response.data.result;
};

// 3. 특정 펀딩 상세 조회
export const getFundingDetail = async (fundingId: number) => {
  const response = await axios.get(`${API_BASE_URL}/fundings/${fundingId}`);
  return response.data.result;
};

// 4. 펀딩 스크랩 등록
export const scrapFunding = async (fundingId: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/fundings/scraps/${fundingId}`
  );
  return response.data.result;
};

// 5. 펀딩 모금 (카카오페이 결제 요청)
export const payForFunding = async (fundingId: number, paymentAmount: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/fundings/pays/${fundingId}`,
    null,
    { params: { paymentAmount } }
  );
  return response.data.result;
};

// 6. 카카오페이 결제 성공
export const kakaoPaySuccess = async (pgToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/fundings/success`, null, {
    params: { pg_token: pgToken },
  });
  return response.data;
};
