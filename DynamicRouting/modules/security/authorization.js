//Returns true if the authorization is valid
module.exports.authorize = function (payload){
    var minTime = ((new Date).getTime()) - 900000;
    if (payload != null) {
        if (payload.clientId != null && payload.clientId === 'oscar-marin') {
            if (payload.signature != null && payload.signature === 'sample-signature') {
                if (payload.date != null && payload.date > minTime) {
                    return true;
                }
            }
        }
    }
    return false;
}