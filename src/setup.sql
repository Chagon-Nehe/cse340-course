-- ==============================================
-- Organization Table
-- ==============================================
CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);


-- ==============================
-- INSERT DATA INTO ORGANIZATION
-- ==============================
INSERT INTO organization (name, description, contact_email, logo_filename) 
VALUES 
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org','unityserve-logo.png');



-- ===============================================
-- Service Project Table
-- ===============================================

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    -- Foreign Key Constraint matching your schema
    CONSTRAINT fk_organization 
        FOREIGN KEY(organization_id) 
        REFERENCES organization(organization_id) 
        ON DELETE CASCADE
);

--==============================================
-- INSERT DATA INTO PROJECT
--==============================================
-- 5 Projects for BrightFuture Builders (Org ID: 1)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(1, 'Community Center Refurbish', 'Painting and repairing the local youth community center.', '123 Main St, Downtown', '2026-08-12'),
(1, 'Park Bench Installation', 'Building and installing 10 new benches in Central Park.', 'Central Park Zone B', '2026-08-19'),
(1, 'Tiny Homes Painting', 'Helping apply weather-resistant paint to transitional tiny homes.', 'Hope Village Outskirts', '2026-09-05'),
(1, 'Wheelchair Ramp Build', 'Constructing accessibility ramps for elderly residents homes.', 'Westside Neighborhood', '2026-09-22'),
(1, 'Library Roof Repair', 'Assisting certified contractors with minor tiling and clearing.', 'Community Library', '2026-10-01');

-- 5 Projects for GreenHarvest Growers (Org ID: 2)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(2, 'Community Garden Planting', 'Sowing autumn vegetables and setting up irrigation lines.', 'Green Plots Community Garden', '2026-08-15'),
(2, 'Urban Orchard Pruning', 'Pruning apple and pear trees ahead of the dormant season.', 'East Side Public Orchard', '2026-08-28'),
(2, 'School Greenhouse Setup', 'Building a small plastic greenhouse for the local elementary school.', 'Lincoln Elementary', '2026-09-10'),
(2, 'Compost Bin Workshop', 'Building large community compost bins and educating neighbors.', 'Northside Recycling Center', '2026-09-18'),
(2, 'Native Wildflower Seeding', 'Dispersing native seeds to help restore local bee populations.', 'Riverfront Meadow', '2026-10-05');

-- 5 Projects for UnityServe Volunteers (Org ID: 3)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(3, 'Food Bank Sorting Day', 'Organizing and boxing non-perishable food items for distribution.', 'Unity Central Food Bank', '2026-08-14'),
(3, 'Senior Center Tech Help', 'Assisting senior citizens with using smartphones and laptops.', 'Silver Linings Care Home', '2026-08-25'),
(3, 'Back-to-School Backpack Drive', 'Stuffing backpacks with school supplies for underprivileged kids.', 'Civic Auditorium Hall A', '2026-09-02'),
(3, 'Homeless Shelter Meal Prep', 'Cooking and serving hot meals for dinner guests.', 'Downtown Hope Shelter', '2026-09-15'),
(3, 'Neighborhood Litter Clean-up', 'A mass sweeping event to clear trash from public walkways.', 'District 4 Commercial Streets', '2026-10-10');

-- =============================================
-- Testing service project database mapping
-- =============================================
SELECT 
    p.project_id,
    p.title AS project_title,
	p.description AS project_description,
    o.name AS sponsoring_org,
    p.location,
    p.project_date
	
FROM project p
JOIN organization o ON p.organization_id = o.organization_id;



--=====================================
--CATEGORIES TABLE
--=====================================
-- 1. Create the Categories Table
CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Create the Junction Table for the Many-to-Many relationship
CREATE TABLE IF NOT EXISTS project_category (
    project_id INT NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id) -- Prevents assigning the same category to a project twice
);

-- 3. Insert the required 3+ categories
INSERT INTO category (name) VALUES
('Construction & Repair'),
('Environment & Gardening'),
('Food & Nutrition'),
('Education & Literacy');

-- 4. Associate EACH of your 15 projects with at least one category
-- (Assuming project_ids are 1 through 15 and category_ids are 1 through 4)
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),   -- BrightFuture projects get Construction
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),  -- GreenHarvest projects get Environment
(11, 3), (12, 4), (13, 4), (14, 3), (15, 2); -- UnityServe gets mixed (Food, Edu, Env)

-- Example of a project belonging to MULTIPLE categories (satisfying the rule)
INSERT INTO project_category (project_id, category_id) VALUES
(1, 2), -- Project 1 is both Construction AND Environment
(11, 4); -- Project 11 is both Food AND Education

