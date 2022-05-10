

const getTestFunction = (req, res) => {
    return res.send("test get function");
};

const getUSers = (req, res) => {
    return res.send("Users func");
};

const saveUsers =() => {
    
}

module.exports = { getTestFunction, getUSers };
