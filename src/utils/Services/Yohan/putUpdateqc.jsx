export const submitQC = async ({ woId, payload }) => {
    const res = await fetch(`https://backend-dashboardrekapqc-kp-yoan.onrender.com/api/wo/${woId}/fat`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    )
    if (!res.ok) {
        throw new Error('Gagal menyimpan QC')
    }

    return res.json()
}