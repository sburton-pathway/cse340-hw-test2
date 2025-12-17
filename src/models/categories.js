import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT
            category_id,
            name
        FROM category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async(id) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows.length > 0 ? result.rows[0] : null;
}

const getCategoriesByServiceProjectId = async(service_project_id) => {
    const query = `
        SELECT c.category_id,
            c.name
        FROM project_category pc
        JOIN category c
        ON pc.category_id = c.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [service_project_id]);

    return result.rows;
}

export {getAllCategories, getCategoryById, getCategoriesByServiceProjectId}  