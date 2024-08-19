export const deleteReview = async (recruitId, reviewId) => {
    try {
        const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}/review/${reviewId}`, {
            method: 'DELETE',
            headers: {
                credentials: "include", // 쿠키와 인증 정보를 함께 보냄

                'accept': '*/*',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete review');
        }

        return true;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

  
