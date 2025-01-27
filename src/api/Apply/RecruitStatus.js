export const updateRecruitStatus = async (recruitId, status) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit/${recruitId}/status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',

				'accept': '*/*',
			},
			credentials: 'include',

			body: JSON.stringify({ status }),
		});

		if (!response.ok) {
			throw new Error('Failed to update status');
		}

		return await response.json();
	} catch (error) {
		console.error('Error updating status:', error);
		throw error;
	}
};