import express from 'express';

import { homePage } from './index.js';
import { partnersPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

router.get('/', homePage);
router.get('/partners', partnersPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;