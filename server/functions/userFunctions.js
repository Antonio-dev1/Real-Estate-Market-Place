// These are for extra functions for the user other than CRUD operations
const bcrypt = require('bcrypt');
require ('dotenv').config();

async function hashPassword(password) {
    const saltRounds = process.env.saltRounds;
    console.log(saltRounds)

    //  Generating the salt from salt rounds
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    return await bcrypt.hash(password, salt);
}

function verifyPassword (password , hash){
    return bcrypt.compare(password, hash);
}


module.exports = {hashPassword , verifyPassword}