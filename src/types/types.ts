import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: '아이디를 입력해주세요' }).email({ message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
  // .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/, '비밀번호를 입력해주세요'),
});

export type FormFields = z.infer<typeof loginSchema>;
