// utils/Services/Yohan/getFatform.jsx
export const fetchFatform = async (woId) => {
    // const res = await fetch(`http://127.0.0.1:5000/api/wo/${woId}/fat`);
    const res = await fetch(`https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/wo/${woId}/fat`)

    if (!res.ok) {
        throw new Error("Failed to fetch FAT data");
    }

    const data = await res.json();

    // mapping agar cocok dengan yang dipakai di form
    return data.fat_list.map(item => ({
        fat: item.fat_id,
        olt: item.fat_olt,
        tikor: item.tikor,
        hc: item.hc,
        tanggal: item.tanggal,
        status: item.status,
        keterangan: item.keterangan,
        qc: item.qc
    }));
}