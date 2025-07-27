import React, { lazy } from 'react';

import { ROUTES } from '@constants/routes';

const MyPage = lazy(() => import('@pages/Mypage/Mypage'));
const Confirm = lazy(() => import('@pages/Mypage/Confirm'));
const MyInformation = lazy(() => import('@pages/Mypage/Myinformation'));
const Field = lazy(() => import('@pages/Mypage/Field'));
const FieldEdit = lazy(() => import('@pages/Mypage/FieldEdit'));
//const PasswordResetEmail = lazy(() => import('@pages/Mypage/PasswordResetEmail'));
//const PasswordResetEmailConfirm = lazy(() => import('@pages/Mypage/PasswordResetEmailConfirm'));
//const PasswordReset = lazy(() => import('@/pages/NotUse/PasswordReset'));
//const ResetSuccess = lazy(() => import('@pages/Mypage/ResetSuccess'));
const DeleteAccount = lazy(() => import('@pages/Mypage/DeleteAccount'));
const Test = lazy(() => import('@pages/Mypage/Test'));

export const mypageRoutes = [
	{ path: ROUTES.MYPAGE, element: <MyPage /> },
	{ path: ROUTES.MYPAGE_AUTHENTICATION, element: <Confirm /> },
	{ path: ROUTES.MYPAGE_INFORMATION, element: <MyInformation /> },
	{ path: ROUTES.MYPAGE_FIELD, element: <Field /> },
	{ path: ROUTES.MYPAGE_FIELD_EDIT, element: <FieldEdit /> },
	//{ path: ROUTES.MYPAGE_PASSWORD_RESET_EMAIL, element: <PasswordResetEmail /> },
	//{ path: ROUTES.MYPAGE_PASSWORD_RESET_EMAIL_CONFIRM, element: <PasswordResetEmailConfirm /> },
	//{ path: ROUTES.MYPAGE_PASSWORD_RESET, element: <PasswordReset /> },
	//{ path: ROUTES.MYPAGE_RESET_SUCCESS, element: <ResetSuccess /> },
	{ path: ROUTES.DELETE_ACCOUNT, element: <DeleteAccount /> },
	{ path: ROUTES.TEST, element: <Test /> },
];
