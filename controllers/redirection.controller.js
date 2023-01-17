const redirectToSentMail = async (req, res, next) => {
    try {
        res.redirect("/passwordRecoveryEmailVerificationSent");
        next();
    } catch (err) {
        console.log(err);
    }
};

const redirectToPassSucceesUpdate = async (req, res, next) => {
    try {
        res.redirect("/PasswordSucceessUpdated");
        next();
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    redirectToSentMail,
    redirectToPassSucceesUpdate
}