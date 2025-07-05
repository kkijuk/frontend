import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddJobButton from '../shared/AddJobButton';
import '../../assets/pencil.svg';
import { Color } from '@/constants/color';

const AddButton = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleAddClick = () => {
		navigate('/history/select');
	};

	return (
		<>
			<Button onClick={() => handleAddClick()} style={{ right: '20px', fontSize: '36px', fontWeight: 700 }}>
				+
			</Button>
		</>
	);
};

export default AddButton;


const Button = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: ${Color.main01};
	color: white;

	position: fixed;
	bottom: 20px;

	cursor: pointer;
	z-index: 10;
`;
