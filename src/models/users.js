import db from './db.js'
import bcrypt from 'bcrypt';

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

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const query_params = [email];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
        return null; // Invalid password
    }

    // remove password_hash before returning user object
    delete user.password_hash;

    return user; // Authentication successful
};

// // Function to get user role by user ID
// const getUserRole = async (userId) => {
//     const query = `
//         SELECT r.role_name 
//         FROM roles r
//         JOIN users u ON u.role_id = r.role_id
//         WHERE u.user_id = $1
//     `;
//     const query_params = [userId];
    
//     const result = await db.query(query, query_params);

//     if (result.rows.length === 0) {
//         throw new Error('User role not found');
//     }

//     return result.rows[0].role_name;
// };

export { createUser, authenticateUser };