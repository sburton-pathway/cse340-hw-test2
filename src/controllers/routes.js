import express from 'express';

import { homePage } from './index.js';
import { partnersPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';
import { organizationDetailsPage } from './organizations.js';

const router = express.Router();

router.get('/', homePage);
router.get('/partners', partnersPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// Route for organization details page
router.get('/organization/:id', organizationDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;