import express from 'express';

import { homePage } from './index.js';
import { categoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';
import { 
    partnersPage,
    organizationDetailsPage, 
    newOrganizationPage, 
    processNewOrganizationForm, 
    organizationValidation, 
    showEditOrganizationPage, 
    processEditOrganizationForm 
} from './organizations.js';

import { 
    projectsPage, 
    projectDetailsPage, 
    showNewProjectForm, 
    processNewProjectForm,
    projectValidation
} from './projects.js';


import { categoryDetailsPage } from './categories.js';

const router = express.Router();

router.get('/', homePage);
router.get('/partners', partnersPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// Route for organization details page
router.get('/organization/:id', organizationDetailsPage);

// Route for project details page
router.get('/project/:id', projectDetailsPage);

// Route for category details page
router.get('/category/:id', categoryDetailsPage);

// Route for new organization page
router.get('/new-organization', newOrganizationPage);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationPage);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;