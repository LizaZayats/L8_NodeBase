async function fetchData(url) {
    const result = {
        data: [],
        isLoading: true,
        error: null
    };
    
    try {
        console.log(`Загрузка данных из: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        result.data = await response.json();
        
    } catch (error) {
        result.error = error;
        console.error('Ошибка загрузки:', error.message);
        
    } finally {
        result.isLoading = false;
    }
    
    return result;
}

module.exports = { fetchData };