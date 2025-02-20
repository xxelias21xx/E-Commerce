const Role = require('../Models/RoleModels');

const inicializarRoles  = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count === 0) {
            await Promise.all([
                new Role({ roles: "user" }).save(),
                new Role({ roles: "moderator" }).save(),
                new Role({ roles: "admin" }).save()
            ]);
            console.log("Roles inicializados correctamente");
        }
    } catch (error) {
        console.error("Error inicializando roles:", error);
    }
};



module.exports = inicializarRoles ;