exports.httpStatus = Object.freeze({
    ok: 200,
    created: 201,
    bad: 400,
    unauthorized: 401,
    forbidden: 403,
    internalServerError: 500
})

exports.httpStatusDefaultMesage = Object.freeze({
    200: 'Success...',
    201: 'Created...',
    400: 'Bad Request...',
    401: 'Unauthorized...',
    403: 'Forbidden...',
    500: 'Internal Server Error...'
})

exports.userStatus = Object.freeze({
    // The default status for new records. To log in, a user record must be active.
    ACTIVE: 'Active', 
    // Users cannot log in. When login tracking is enabled, a user can be blocked when they incorrectly enter their name or password beyond the number of times specified in security controls. Blocked is a system-generated status; you cannot use the Change Status action to change a status to blocked.
    BLOCKED: 'Blocked',
    // The user was deleted but the user name has been retained because login tracking is enabled. You can configure login tracking in the Security Controls window. If login tracking is not enabled, all evidence of a user that is deleted is removed from the database and the user name can be reused. If login tracking is enabled, the user name is retained in the MAXUSER table with a status of deleted and the user name cannot be reused. User names that have a status of deleted are not displayed in the Users application.
    DELETED: 'Deleted',
    // Users cannot log in. Inactive user records do not appear in select value lists and cannot be associated with new records.
    INACTIVE: 'Inactive',
    // The default status for user records that are created using self-registration. This status is used to identify user records to route into a workflow process.
    NEWREG: 'Newreg'
})