import React from 'react';

const Agreement = ({ checked, setChecked, label, handleModal }) => (
	<div className="agreement">
		<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
		<label>{label}</label>
		<span className="arrow" onClick={handleModal}>
			&gt;
		</span>
	</div>
);

export default Agreement;
