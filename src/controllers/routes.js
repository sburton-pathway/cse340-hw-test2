import express from 'express';

import { homePage } from './index.js';
import { partnersPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { projectDetailsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';
import { organizationDetailsPage, newOrganizationPage, proecessNewOrganizationForm } from './organizations.js';
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
router.post('/new-organization', proecessNewOrganizationForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;