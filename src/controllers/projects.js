// Import any needed model functions
import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import { getCategoriesByServiceProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';

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

    res.render('project', { title, project, categories });
}

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        console.log('Creating new project with data:', { title, description, location, date, organizationId });

        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}

// Export any controller functions
export { 
    projectsPage, 
    projectDetailsPage, 
    showNewProjectForm, 
    processNewProjectForm 
};