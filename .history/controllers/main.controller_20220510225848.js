

const getTestFunction = (req, res) => {
    return res.send("test get function");
};

const getUSers = (req, res) => {
    return res.send("Users func");
};

const saveUsers =(req, res) => {
   return res.send("save users")
}

module.exports = { getTestFunction, getUSers };
