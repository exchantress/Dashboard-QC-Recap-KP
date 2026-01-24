export const fetchSummary = async () => {
    // const res = await fetch("http://127.0.0.1:5000/api/summary");
    const res = await fetch("https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/summary");
    if (!res.ok) throw new Error("Failed to fetch summary");
    return res.json();
};

export const fetchMonthly = async () => {
    const res = await fetch("https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/monthly");
    if (!res.ok) throw new Error("Failed to fetch monthly");
    return res.json();
};