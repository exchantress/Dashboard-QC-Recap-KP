// utils/Services/Yohan/getWorkOrders.jsx
export const fetchWorkorders = async () => {
    // const res = await fetch("http://127.0.0.1:5000/api/wo");
    const res = await fetch("https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/wo")

    if (!res.ok) {
        throw new Error("Failed to fetch work orders");
    }

    const data = await res.json();

    // mapping agar cocok dengan Datatable
    return data.map(item => ({
        wo: item.wo_id,
        fat: item.total_fat,
        status:
            item.status === "DONE"
                ? "Approved"
                : item.status === "REJECT"
                    ? "Rejected"
                    : "Not Yet"
    }));
};