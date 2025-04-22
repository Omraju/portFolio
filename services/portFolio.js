import portFolioDao from '../daos/portFolio.js';
import moment from 'moment';
async function add(detailsToAdd) {
    try {
        let contactDetails = {
            "name": detailsToAdd.name,
            "email": detailsToAdd.email,
            "subject": detailsToAdd.subject,
            "message": detailsToAdd.message,
            "date": moment().format('YYYY-MM-DD'),
        }
        let result = await portFolioDao.create(contactDetails);
        return Promise.resolve({ _id: result.insertedId });
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export default {
    add,
}