// import db from "./db.js";
import db from "./db.js";

const getAllCategories = async () => {
    const [categories] = await db.query('SELECT * FROM categories');
    return categories;
};

export { getAllCategories };