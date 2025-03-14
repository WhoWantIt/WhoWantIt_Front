export interface PostType {
  postId: number;
  beneficiaryId: number;
  nickname: string;
  title: string;
  content: string;
  attachedImages: string[];
  attachedExcelFile: string;
  approvalStatus: string;
  isVerified: boolean;
  createdAt: string;
}
