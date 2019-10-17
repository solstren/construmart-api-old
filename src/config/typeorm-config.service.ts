import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CockroachConnectionOptions } from 'typeorm/driver/cockroachdb/CockroachConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
import { CordovaConnectionOptions } from 'typeorm/driver/cordova/CordovaConnectionOptions';
import { NativescriptConnectionOptions } from 'typeorm/driver/nativescript/NativescriptConnectionOptions';
import { ReactNativeConnectionOptions } from 'typeorm/driver/react-native/ReactNativeConnectionOptions';
import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { AuroraDataApiConnectionOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions';
import { ExpoConnectionOptions } from 'typeorm/driver/expo/ExpoConnectionOptions';
import { AppConstants } from '../utils/app-constants';
import { DbConnectionProperties } from '../utils/db-connection-properties';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        throw new Error('Not Implemented');
        // return {
        //     type: 'mysql',
        //     host: DbConnectionProperties.DB_HOST,
        //     port: DbConnectionProperties.DB_PORT,
        //     username: DbConnectionProperties.DB_USER,
        //     password: DbConnectionProperties.DB_PASSWORD,
        //     database: DbConnectionProperties.DB_NAME,
        //     entities: [],
        //     synchronize: true,
        //     logging: true
        // }
    }

}
