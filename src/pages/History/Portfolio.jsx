import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import './history.css'
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import { Affiliation1, Affiliation2 } from '../../components/Modal/AddCareerModal/Affiliation';

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
			<Affiliation1 onAffiliationChange={(value) => setAffiliation(value)} />
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<Affiliation2 onAffiliationChange={(value) => setAffiliation(value)} />
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<button onClick={toggleModal}>Add Career</button>
			{isModalOpen && <AddCareerModal onClose={toggleModal}></AddCareerModal>}
		</>
	);
};
export default Portfolio;
