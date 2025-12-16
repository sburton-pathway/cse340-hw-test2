// Import any needed model functions
import { getAllOrganizations } from '../models/organizations.js';

// Define any controller functions
const partnersPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partners';
    
    res.render('partners', { title, organizations });
};

// Export any controller functions
export { partnersPage };