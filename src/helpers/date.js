const dateFormat = (dateObj) => {
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = dateObj.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

const today = dateFormat(new Date());

let lastWeek = new Date(new Date().setDate(new Date().getDate()-5));
lastWeek = dateFormat(lastWeek);

export default {
    today,
    lastWeek
}

