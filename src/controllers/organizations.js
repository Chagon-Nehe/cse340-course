// import getOrganizations from the organizations model
import { getAllOrganizations } from '../models/organizations.js';

// define the controller function to show the organizations page
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
}

// export the controller function
export { showOrganizationsPage };