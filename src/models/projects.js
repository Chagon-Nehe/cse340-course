import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id,
               o.name AS organization_name,
               p.title AS project_title,
               p.description AS project_description,
               p.location,
               p.project_date
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};
// Retrieves all projects associated with a specific organization ID
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};


/**
 * Retrieves the next upcoming service projects starting from today.
 * 
 * @param {number} number_of_projects - The maximum number of projects to return.
 * @returns {Promise<Array>} Array of project objects mapped with organization names.
 */
const getUpcomingProjects = async (number_of_projects) => {
    // SQL Query to select required project fields along with organization name
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    try {
        const result = await db.query(query, [number_of_projects]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching upcoming projects:', error.message);
        throw error;
    }
};

/**
 * Retrieves details for a single service project by its ID.
 * 
 * @param {number|string} id - The ID of the service project to fetch.
 * @returns {Promise<Object|null>} The project object if found, or null if not found.
 */
const getProjectDetails = async (id) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    try {
        const result = await db.query(query, [id]);
        // Return the first matching object, or null if no project matches the ID
        return result.rows[0] || null;
    } catch (error) {
        console.error(`Error fetching project with ID ${id}:`, error.message);
        throw error;
    }
};

// Export all model functions together at the bottom of the file

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails   };