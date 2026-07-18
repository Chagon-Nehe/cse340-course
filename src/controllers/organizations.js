// import getOrganizations from the organizations model
import { getAllOrganizations, getOrganizationDetails} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// define the controller function to show the organizations page
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
}

// define the controller function to show the organization details page
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};
// export the controller function
export { showOrganizationsPage, showOrganizationDetailsPage };