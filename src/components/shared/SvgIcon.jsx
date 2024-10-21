import React from 'react';
import icon from '../../../src/assets/icons.svg';

const SvgIcon = ({ name, size = 24, color = 'currentColor' }) => {
	return (
		<svg width={size} height={size} fill={color}>
			<use href={`${icon}#${name}`} />
		</svg>
	);
};

export default SvgIcon;
