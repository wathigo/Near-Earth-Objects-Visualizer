const today = dateFormat(new Date());

const lastWeek = new Date(new Date().setDate(new Date().getDate()-5));
lastWeek = dateFormat(lastWeek);

const dateFormat = (dateObj) => {
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = dateObj.getFullYear();

    return yyyy + '/' + mm + '/' + dd;
}

export default {
    today,
    lastWeek
}

