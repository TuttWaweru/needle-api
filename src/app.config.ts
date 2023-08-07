import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"

export const environmentVariables = () =>({
    apiPort: Number(process.env.API_PORT) || 3000,
    socketPort: process.env.SOCKET_PORT || 9229,
    database: {
        type: process.env.DB_TYPE,
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
    },
})

export const typeOrmModuleConfiguration: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => await configService.get('database'),
}