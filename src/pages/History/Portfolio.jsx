import React, { useEffect, useState } from 'react';
import Helper from '../../components/Intro/Helper';
import styled from 'styled-components';
// import './history.css'
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import { Affiliation1, Affiliation2 } from '../../components/Modal/AddCareerModal/Affiliation';
import CustomDropdown from '../../components/Record/CustomDropdown';

const Portfolio = () => {
	const setAffiliation = () => {
		console.log('Test');
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	return (
		<>
		</>
	);
};
export default Portfolio;
