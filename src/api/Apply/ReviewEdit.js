// ReviewEdit.js
export async function editReview(recruitId, reviewId, reviewData) {
    try {
        const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}/review/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to edit review: ${errorData.message || response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to edit review:', error);
        throw error;
    }
}
