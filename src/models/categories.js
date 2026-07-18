// import db from "./db.js";
import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id,
               name AS category_name
        FROM public.category;
            
    `;
    const result = await db.query(query);
    return result.rows;
};

export { getAllCategories };