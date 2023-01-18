module.exports = {
    User: class {
        constructor(name, password, email, role) {
            this.name = name;
            this.password = password;
            this.email = email;
            this.role = role;
        }
    },
    collectionName:"Users",
    options: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "User validation",
                required: ["name", "password", "email", "role"],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "'name' must be a string and is required"
                    },
                    password: {
                        bsonType: "string",
                        description: "'password' must be a string and is required"
                    },
                    email: {
                        bsonType: "string",
                        description: "'email' must be a string and is required"
                    },
                    role: {
                        enum: ["Client", "Atelier", "Finance"],
                        description: "'role' doit être soit 'Client', 'Atelier', 'Finance'"
                    }
                }
            }
        }
    },
    indexes:[{indexInfo:{ "email": 1 },isUnique:true}],
}