const { expressjwt: jwt } = require('express-jwt');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // Authenticate JWT token and attach decoded token to request as req.auth
        jwt({ secret, algorithms: ['HS256'] }),

        // Attach user record to request object
        async (req, res, next) => {
            try {
                // 检查req.auth是否存在
                if (!req.auth || !req.auth.sub) {
                    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
                }
                
                // Get user with id from token 'sub' (subject) property
                const conn = await db.getConnection();
                if (!conn) {
                    return res.status(500).json({ message: 'Database connection failed' });
                }
                
                const respond = await conn.request()
                    .input('id', req.auth.sub)
                    .query('SELECT id, username FROM Users WHERE id = @id');
                
                // Check user still exists
                if (respond.recordset.length === 0) {
                    return res.status(401).json({ message: 'Unauthorized - User not found' });
                }

                // Attach user to request
                req.user = respond.recordset[0];
                next();
            } catch (error) {
                console.error('Authorization error:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    ];
}