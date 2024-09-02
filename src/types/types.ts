import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: '아이디를 입력해주세요' }).email({ message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
  // .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/, '비밀번호를 입력해주세요'),
});

export type FormFields = z.infer<typeof loginSchema>;

export type Area = {
  squareMeter: number;
  price: number;
  discountPercent: number;
  discountPrice: number;
};

export type FileData = {
  fileName: string;
  fileUrl: string;
  fileType: string;
};

export type FormValues = {
  propertyHouseholdArea: string;
  areas: Area[];
  files: FileData[];
  discountSale: boolean;
  discountSystem: boolean;
  propertyAreaAddr: string;
  addrDo: string;
  addrGu: string;
  addrDong: string;
  buildingName: string;
  propertyModelhouseAddr: string;
  propertyType: string;
  salesType: string;
};
