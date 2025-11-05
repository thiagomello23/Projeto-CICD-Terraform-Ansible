import { execSync } from 'child_process';
import * as fs from 'fs';

try {
    const tempMigrationPath = './src/database/migrations/temp/';
    const tempMigrationName = 'TempMigration';

    // Builda para pegar o data-source em *js
    execSync('npm run build');

    try {
        execSync(
            `npx typeorm migration:generate -d ./dist/database/data-source.js ${tempMigrationPath}${tempMigrationName}`,
        );
    } catch (err: unknown) {
        if (
            err instanceof Error &&
            'stdout' in err &&
            err.stdout instanceof Buffer
        ) {
            err.stdout
                .toString()
                .includes('No changes in database schema were found');
            console.log('Migrations em dia com as entities.');
            process.exit(0);
        } else {
            throw err;
        }
    }

    if (fs.readdirSync(tempMigrationPath)?.length > 0) {
        console.error(
            'Há alterações que precisam de migration, por favor rode npx typeorm migration:generate para conferir!',
        );
        fs.rmSync(tempMigrationPath, { recursive: true, force: true });
        process.exit(0);
    }
} catch (err: unknown) {
    if (err instanceof Error) {
        console.log('Erro ao verificar alterações nas migrations:');
        console.error(err.message);
    } else {
        console.error(
            'Erro desconhecido ao verificar integridade das migrations:',
        );
        console.error(err);
    }
    process.exit(1);
}
