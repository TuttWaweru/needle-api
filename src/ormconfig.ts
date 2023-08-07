import { DataSource } from 'typeorm';
// let host = process.env.DB_HOST;
// let port = Number(process.env.DB_PORT);
// let username = process.env.DB_USERNAME;
// let password = process.env.DB_PASSWORD;
// let database = process.env.DB_DATABASE;
// let migrationsRun = (process.env.DB_MIGRATIONS_RUN === 'true');
// let synchronize = (process.env.DB_SYNCHRONIZE === 'true')
// let migrationsTableName = process.env.DB_MIGRATIONS_NAME;
// let migrationsDir = process.env.DB_MIGRATIONS_DIR;
// let logging = process.env.DB_LOGGING === "true";
// let logger = process.env.DB_LOGGER;

// export default new DataSource ({
//     type: 'mysql',
//     host: '161.97.136.184',
//     port: 3309,
//     username: 'root',
//     password: 'P@ssw0rd',
//     database: 'needle-service',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     // migrationsRun: false,
//     // synchronize: false,
//     migrationsTableName: "migrations",
//     migrations: ['dist/migrations/*.js'],

//     // logging: true,
    
// });
export default new DataSource ({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsTableName: process.env.DB_MIGRATIONS_NAME,
    migrations: ['dist/migrations/*.js'],    
    // logging: process.env.DB_LOGGING === 'true',
});

// export = databaseConfig;