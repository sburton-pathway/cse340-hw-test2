// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

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

const processNewOrganizationForm = async (req, res) => {
    // // Check for validation errors
    // const results = validationResult(req);
    // if (!results.isEmpty()) {
    //     // TODO: Save the validation errors to display on the form

    //     // Redirect back to the new organization form
    //     return res.redirect('/new-organization');
    // }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations    

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    
    // Set a success flash message
    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};

// Export any controller functions
export { partnersPage, organizationDetailsPage, newOrganizationPage, processNewOrganizationForm, organizationValidation };