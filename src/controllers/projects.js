// import getallProjects function from the projects model
import { getAllProjects } from '../models/projects.js';

// define the controller function to show the projects page
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Our Projects';
    res.render('projects', { title, projects });
}

// export the controller function
export { showProjectsPage };