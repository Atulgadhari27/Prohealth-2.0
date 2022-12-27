
const maxAge = 3 * 24 * 60 * 60;
const Admin = require("../models/admin");

module.exports.admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.login(email, password);
      res.status(200).json({ admin });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  };

module.exports.admin_register = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = Admin.create()
    } catch (error) {
        
    }
}