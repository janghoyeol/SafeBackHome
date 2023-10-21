import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password')
});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], '비밀번호가 일치해야 합니다.')
    .required('비밀번호 확인 필요')
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('올바른 이메일을 입력해야 합니다.')
    .label('Email')
    .email('유효한 이메일 입력')
});
