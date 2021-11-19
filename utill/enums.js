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