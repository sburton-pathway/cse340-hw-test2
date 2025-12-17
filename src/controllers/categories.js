// Import any needed model functions
import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

// Define any controller functions
const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    
    res.render('categories', { title, categories });
};  

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('categoryDetails', {title, categoryDetails, projects});
};


// Export any controller functions
export { categoriesPage, categoryDetailsPage };