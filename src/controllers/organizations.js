// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// Define any controller functions
const partnersPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partners';

    res.render('partners', { title, organizations });
};

const organizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

const newOrganizationPage = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

const proecessNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations    

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    res.redirect(`/organization/${organizationId}`);
};

// Export any controller functions
export { partnersPage, organizationDetailsPage, newOrganizationPage, proecessNewOrganizationForm };