export const mapStatusToValue = (status) => {
    if (!status) return '1';
    const statusUpper = status.toUpperCase();
    if (statusUpper === 'APPROVE' || statusUpper === 'DONE') return '2';
    if (statusUpper === 'REJECT') return '3';
    return '1';
}

export const mapValueToStatus = (value) => {
    if (value === '2') {
        return 'DONE'
    }
    else if (value === '3') {
        return 'REJECT'
    }
    else {
        return 'NOT YET'
    }
}