import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { logout } from '../api/Login/Logout'; 

const HeaderWrapper = styled.div`
	width: 100%;
	border-bottom: 1px solid #ccc;
`;

const HeaderStyle = styled.div`
	max-width: 820px;
	height: 70px;
	flex-shrink: 0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 15px;
	margin: 0 auto;
	padding: 0 20px;

	@media (max-width: 855px) {
		padding: 0 15px;
	}
`;

const NavContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 0;
`;

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	ul {
		list-style: none;
		display: flex;
		padding: 0;
		margin: 0;
	}
	li {
		margin-left: 40px;
		margin-right: 25px;
		cursor: pointer;
		color: #333;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		position: relative;
		font-family: Bold;
		white-space: nowrap;

		@media (max-width: 855px) {
			margin: 0 15px;
			font-size: 18px;
		}
	}

	li:hover {
		color: #707070;
	}

	.active {
		color: #333;
	}
	.active::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 5px;
		background-color: #3aaf85;
		bottom: -22px;
		left: 0;

		@media (max-width: 855px) {
			bottom: -24px;
		}
	}
`;

const UserProfileButton = styled.button`
	width: 45px;
	height: 45px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background-color: #F1F1F1;
	cursor: pointer;
	margin-left: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 55px;
	right: 0;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	width: 110px;
	height: 70px;
	padding: 10px;
	z-index: 100;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	a {
		text-decoration: none;
		color: #000;
		font-family: Regular;
		font-size: 16px;
		padding: 8px 0;
		width: 100%;
		text-align: center;
	}

	a:hover {
		background-color: #f5f5f5;
	}
`;

const LogoContainer = styled.span`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-right: 45px;
`;

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const handleUserProfileButtonClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleNavigation = (path) => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		navigate(path);
	};

	const handleLogout = async () => {
		try {
			sessionStorage.setItem('manualLogout', 'true');
			const success = await logout(); //  로그아웃 API 호출
			if (success) {
				navigate('/'); //  홈으로 이동
			} else {
				alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
			}
		} catch (error) {
			console.error('로그아웃 오류:', error);
			alert('로그아웃 중 문제가 발생했습니다.');
		}
	};

	return (
		<HeaderWrapper>
			<HeaderStyle>
				<NavContainer>
					<LogoContainer onClick={() => handleNavigation('/home')}>
						<img style={{ width: '80px', height: '40px' }} src={logo} alt="로고" />
					</LogoContainer>
					<Nav>
						<ul>
							<li
								onClick={() => handleNavigation('/mycareer')}
								className={location.pathname === '/mycareer' ? 'active' : ''}>
								내커리어
							</li>
							<li
								onClick={() => handleNavigation('/history')}
								className={location.pathname === '/history' ? 'active' : ''}>
								서류준비
							</li>
							<li
								onClick={() => handleNavigation('/apply-schedule')}
								className={location.pathname === '/apply-schedule' ? 'active' : ''}>
								지원관리
							</li>
						</ul>
						<UserProfileButton onClick={handleUserProfileButtonClick}>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#707070" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25.7367 27.5C25.7367 22.6625 20.9242 18.75 14.9992 18.75C9.07421 18.75 4.26172 22.6625 4.26172 27.5" stroke="#707070" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
							{isDropdownOpen && (
								<DropdownMenu ref={dropdownRef}>
									<a onClick={() => handleNavigation('/mypage/authentication')}>마이페이지</a>
									<a onClick={handleLogout}>로그아웃</a>
								</DropdownMenu>
							)}
						</UserProfileButton>
					</Nav>
				</NavContainer>
			</HeaderStyle>
		</HeaderWrapper>
	);
}
