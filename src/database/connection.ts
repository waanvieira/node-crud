import { DataSource } from "../../node_modules/typeorm/index";
const path = require('path');
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "ts_node",
    synchronize: true,
    logging: true,
    // Aqui temos o mapeamento das nossas entidades
    // Product
    //Pega referencia de todos que tem o nome * = alguma coisa .entity.ts
    entities: [
        // Faz o mapeamento de todos os arquivos da pasta entities, todos os arquivos dessa pasta vão ser rastreados
        path.join(__dirname+'/../entities/*')
    ],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
        .then(() => console.log('connected success'))
        .catch((error) => console.log(error))

export default AppDataSource;