// No import needed

// define the home controller function
const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
}

// export the controller function
export { showHomePage };