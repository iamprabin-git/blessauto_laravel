export const apiUrl = 'http://localhost:8000/api';

export const adminToken = () => {
    const info = localStorage.getItem('adminInfo');
    
    // 1. Check if info exists at all
    if (!info) return null;

    try {
        const data = JSON.parse(info);
        // 2. Check if data and token exist
        return data && data.token ? data.token : null;
    } catch (error) {
        console.error("Error parsing admin info", error);
        return null;
    }
}