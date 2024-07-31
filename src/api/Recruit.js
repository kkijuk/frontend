const apiUrl = 'http://43.203.222.231/recruit';

export const createRecruit = async (data) => {
  try {
    const response = await fetch(apiUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating recruit:", error.message);
    throw error;
  }
};




























