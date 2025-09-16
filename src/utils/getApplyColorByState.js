const getApplyColorByState = (state) => {
    switch (state) {
        case 'APPLIED':
            return 'blue';
        case 'REJECTED':
            return 'red';
        case 'ACCEPTED':
            return 'green';
        default:
            return 'gray';
    }
};

export default getApplyColorByState;