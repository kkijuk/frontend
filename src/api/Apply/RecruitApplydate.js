export const updateRecruitApplyDate = async (recruitId, applyDate) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit/${recruitId}/apply-date`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ applyDate }),
		});

		if (!response.ok) {
			throw new Error('Failed to update apply date');
		}

		return await response.json();
	} catch (error) {
		console.error('Error updating apply date:', error);
		throw error;
	}
};
