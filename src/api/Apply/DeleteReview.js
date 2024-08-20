export const deleteReview = async (recruitId, reviewId) => {
    try {
        const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}/review/${reviewId}`, {
            method: 'DELETE',
            headers: {

                'accept': '*/*',
            },
            credentials: "include",
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

  
