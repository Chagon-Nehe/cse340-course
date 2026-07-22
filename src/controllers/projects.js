// import getallProjects function from the projects model
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

//limit the number of upcoming projects to display on the projects page
const NUMBER_OF_UPCOMING_PROJECTS = 5;
// define the controller function to show the Upcoming Projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
}
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails });
}

// export the controller function
export { showProjectsPage, showProjectDetailsPage };