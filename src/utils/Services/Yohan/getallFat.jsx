export const fetchFatList = async (limit = 10, search = "") => {
    const res = await fetch(`https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/listfat?mode=select&limit=${limit}&q=${search}`)
    if (!res.ok) {
        throw new Error("Failed to fetch summary");
    }

    return res.json();
};

export const fetchFattable = async () => {
    const res = await fetch("https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/listfat?mode=table")

    if (!res.ok) {
        throw new Error("Failed to fetch summary");
    }

    const data = await res.json()
    console.log("RAW API DATA:", data)

    return data.map(item => ({
        fat: item.id_fat,
        wo: item.wo_id,
        status:
            item.status === "DONE"
                ? "Approved"
                : item.status === "REJECT"
                    ? "Rejected"
                    : "Not Yet"
    }));
}