const db = require("mysql2")
const dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};

// con.connect((error) => {
//     if (error) {
//         console.log("");
//     } else {
//         console.log("connected");
//     }
// });



module.exports = { db, dbhost_ra1 } ;
