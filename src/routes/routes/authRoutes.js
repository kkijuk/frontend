import React, { lazy } from 'react';

import { ROUTES } from '@constants/routes';

const SocialLogin = lazy(() => import('@pages/SocialLogin'));
const SocialRedirect = lazy(() => import('@components/Redirect'));
const NewSignup = lazy(() => import('@pages/NewSignup'));
const SignupSuccess = lazy(() => import('@pages/SignupSuccess'));
const SignupInterest = lazy(() => import('@pages/SignupInterest'));
const PrivacyAgreed = lazy(() => import('@pages/PrivacyAgreed'));
const AgreementPage = lazy(() => import('@pages/AgreementPage'));
const ServiceAgreePage = lazy(() => import('@pages/ServiceAgree'));

export const authRoutes = [
	{ path: ROUTES.ROOT, element: <SocialLogin /> },
	{ path: ROUTES.SIGNUP, element: <NewSignup /> },
	{ path: ROUTES.SIGNUP_SUCCESS, element: <SignupSuccess /> },
	{ path: ROUTES.SIGNUP_INTEREST, element: <SignupInterest /> },
	{ path: ROUTES.PRIVACY_AGREED, element: <PrivacyAgreed /> },
	{ path: ROUTES.PRIVACY_POLICY, element: <AgreementPage /> },
	{ path: ROUTES.SERVICE_AGREE, element: <ServiceAgreePage /> },
	{ path: ROUTES.KAKAO_REDIRECT, element: <SocialRedirect provider="kakao" /> },
	{ path: ROUTES.NAVER_REDIRECT, element: <SocialRedirect provider="naver" /> },
];
