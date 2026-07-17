// no import needed
//define the error controller function
// test routes for 500 errors
const testErrorPage = async (req, res) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

// export the error controller function
export { testErrorPage };