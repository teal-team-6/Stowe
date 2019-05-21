export const fetchChartData = async ()  => {
    const res = await get('/api/current_user');
    return res
}; 