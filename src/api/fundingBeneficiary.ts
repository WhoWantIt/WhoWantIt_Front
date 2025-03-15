import axios from "axios";

const API_BASE_URL = "http://13.209.33.88:8080";

// 1. 특정 펀딩 상세 조회
export const getBeneficiaryFundingDetail = async (fundingId: number) => {
  const response = await axios.get(`${API_BASE_URL}/fundings/${fundingId}`);
  return response.data.result;
};

// 2. 펀딩 신청한 후원자 리스트 조회
export const getSponsorsList = async (fundingId: number) => {
  const response = await axios.get(`${API_BASE_URL}/fundings/sponsors/${fundingId}`);
  return response.data.result;
};

// 3. 전체 펀딩 리스트 조회 (ALL)
export const getAllBeneficiaryFundings = async () => {
  const response = await axios.get(`${API_BASE_URL}/fundings/lists`);
  return response.data.result;
};

// 4. 진행 중 / 완료된 펀딩 조회
export const getBeneficiaryFilteredFundings = async (status: string) => {
  const response = await axios.get(`${API_BASE_URL}/fundings/filters`, {
    params: { status },
  });
  return response.data.result;
};

// 5. 새로운 펀딩 생성 (수혜자)
export const createFunding = async (fundingData: object) => {
  const response = await axios.post(`${API_BASE_URL}/fundings/`, fundingData);
  return response.data.result;
};

// 6. 펀딩 이미지 생성 (업데이트)
export const updateFundingImage = async (fundingId: number, imageData: object) => {
  const response = await axios.put(`${API_BASE_URL}/fundings/${fundingId}`, imageData);
  return response.data.result;
};
