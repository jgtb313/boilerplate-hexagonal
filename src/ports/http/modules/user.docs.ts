/**
 *
 * @api {POST} /users Create an user
 * @apiName Create an user
 * @apiDescription Create an user
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (Body) {String} name User name
 * @apiParam (Body) {String} email User email
 *
 * @apiExample {curl} curl
 *   curl -X POST /users \
 *        -d '{"name":"Name", "email":"name@example.com"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   await axios({
 *     method: 'POST',
 *     url: '/users',
 *     data: {
 *       name: 'Name',
 *       email: 'name@example.com'
 *     }
 *   });
 *
 * @apiSuccess (200) {String} id User UUID
 * @apiSuccess (200) {String} name User name
 * @apiSuccess (200) {String} email User email
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 'a74d53f5-d3ee-4576-af8e-5f9a43fbd48b',
 *   "name": "Name",
 *   "email": "name@example.com"
 * }
 *
 * @apiError {Object} error Error response
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Conflict
 * {
 *   message: "validationFailed",
 *   errors: []
 * }
 * HTTP/1.1 400 Conflict
 * {
 *   message: "emailExists"
 * }
 *
 */
