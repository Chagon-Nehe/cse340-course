// import getallcategories function from the model
import { getAllCategories } from '../models/categories.js';

// define the controller function to show the categories page
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
}

// export the controller function
export { showCategoriesPage };