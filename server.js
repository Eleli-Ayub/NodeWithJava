const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test1"
})
let length = 0;

const checkChange = (newLength)=>{
    if (newLength > length) {
        console.log("Data has been added");
        console.log("You now have : " + newLength + " entries");
        length = newLength
    }
}

const sqlQuery = "SELECT * FROM users"
connection.connect((error)=>{
    if (error) {
        console.log(error);
    }else{
        setInterval(() => {
            connection.query(sqlQuery,(error, result)=>{
                if (error) {
                    console.log(error);
                }else{
                    if (result.length > length) {
                        length = result.length
                        console.log("\n\n------------New entry added------------\n\n");
                        console.log("First Name: " + result[length-1].firstName+ "\t" + "LastName: " + result[length-1].lastName + "\t" + "EmailAddress: "  + result[length-1].email + "\t" + "Password: " + result[length-1].password);                        
                        console.log("------------You now have: " + length+ " entries------------");
                    }
                }
            })
        }, 100);
    }
})