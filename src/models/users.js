import db from './db.js'

const createUser = async (email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (email, password_hash, role_id) 
        VALUES ($1, $2, (SELECT role_id FROM roles WHERE role_name = $3)) 
        RETURNING user_id
    `;
    const query_params = [email, passwordHash, default_role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

export { createUser };