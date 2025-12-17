// Import any needed model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByServiceProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    
    res.render('projects', { title, projects });
};  

const projectDetailsPage = async (req, res) => {
    const id = req.params.id;
    const project = await getProjectDetails(id);
    const categories = await getCategoriesByServiceProjectId(id);
    const title = `${project.title} Details`;

    res.render('projectDetails', { title, project, categories });
}

// Export any controller functions
export { projectsPage, projectDetailsPage };