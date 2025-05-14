import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../utils/api"; // axios 인스턴스
export default function KakaoPaySuccess() {
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get("pg_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (pgToken) {
      api
        .get(`/fundings/success?pg_token=${pgToken}`)
        .then((res) => {
          console.log("결제 완료 응답: ", res.data);
          navigate("/");
        })
        .catch((err) => {
          console.error("결제 완료 처리 실패: ", err);
        });
    }
  }, [pgToken]);

  return (
    <div>
      <h1>결제가 성공적으로 완료되었습니다!</h1>
    </div>
  );
}
