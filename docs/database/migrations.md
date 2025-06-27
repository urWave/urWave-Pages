---
sidebar_position: 1
---
import BrowserWindow from '@site/src/components/BrowserWindow';

# Database Migrations Guide

This guide covers the database migration tools and commands used in our platform. We use Entity Framework Core migrations to manage database schema changes across multiple contexts: LogDbContext, AppDbContext, and Identity Provider contexts (ConfigurationDbContext and PersistedGrantDbContext).


## Prerequisites

- .NET Core SDK 8.0 or later
- Entity Framework Core CLI tools
- Access to the project's source code
- Appropriate database permissions

#### To install EF Core tools globally:

```bash
dotnet tool install --global dotnet-ef
```


## Using MigratorExecutor

The easiest way to run migrations is using our interactive `MigratorExecutor.bat` script, located in the root of the project.

### Features

- Interactive menu-driven interface
- Automatic detection of migrator executable (Debug/Release)
- Support for all database contexts
- Configurable migration options

### Using the Executor

1. Navigate to the project root directory
2. Run `MigratorExecutor.bat`
3. Follow the interactive prompts:

#### Available options:

1. Run migrations for ALL databases
2. Run migrations for specific database:
    - Log Database
    - App Database
    - IDP Configuration Database
    - IDP Persisted Grants Database
3. Run with custom flags
4. Exit

#### For each option, you can configure:

- Database recreation (--r)
- Initial data seeding (--s)
- Verbose logging (--v)
- Sample data inclusion (--d)


## Manual Command Usage


###  Run generate hangfire migrations
```bash
UW.Platform.Migrator.exe hangfire
``` 

###  Run migration using cmd
```bash
UW.Platform.Migrator.exe apply --database all --r --s --v --d
```
- r: Recreate database
- s: Seed Data
- v: Verbose
- d: Seed Sample Data

### Add new migration
- To add a new migration called `InitialMigration` for the `LogDbContext` we need to run the following command
```bash
dotnet ef migrations add "InitialMigration" --context LogDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator --output-dir Data\LogDb
```

- To add a new migration called `InitialMigration` for the `AppDbContext` we need to run the following command
```bash
dotnet ef migrations add "InitialMigration" --context AppDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator --output-dir Data\AppDb
```

- To add a new migration called `InitialMigration` for the `ConfigurationDbContext` (IDP) we need to run the following command
```bash
dotnet ef migrations add "InitialMigration" --context ConfigurationDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator --output-dir Data\IDP\ConfigurationDb
```

- To add a new migration called `InitialMigration` for the `PersistedGrantDbContext` (IDP) we need to run the following command
```bash
dotnet ef migrations add "InitialMigration" --context PersistedGrantDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator --output-dir Data\IDP\PersistedGrantDb
```

### Remove last generated migration
```bash
dotnet ef migrations remove --context AppDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator
```

### Apply pending migrations
```bash
dotnet ef database update --context AppDbContext --project src\UW.Platform.Migrator --startup-project src\UW.Platform.Migrator
```

### Generate SQL script for all migrations
```bash
Script-Migration -StartupProject src\UW.Platform.Migrator -Context LogDbContext
```

### Generate SQL script for specific migrations
```bash
Script-Migration -StartupProject src\UW.Platform.Migrator -From 'AddProviderNumberToChat' -To 'AddMessageSidAndState' -Context AppDbContext
```


## Database Contexts

#### Our platform uses multiple database contexts:

### 1. **LogDbContext**
- Purpose: Handles logging and audit data
- Location: `Data\LogDb`


### 2. **AppDbContext**
- Purpose: Main application data
- Location: `Data\AppDb`


### 3. **ConfigurationDbContext**
- Purpose: Identity Provider configuration
- Location: `Data\IDP\ConfigurationDb`


### 4. **PersistedGrantDbContext**
- Purpose: Identity Provider tokens and grants
- Location: `Data\IDP\PersistedGrantDb`


## Troubleshooting

#### Common issues and solutions:

### 1. Migration fails to apply
- Ensure database connection is valid
- Check for pending transactions
- Verify correct context is specified

### 2. Conflicting migrations
- Remove last migration if not applied
- Ensure all developers are synchronized
- Use source control to track migration files

### 3. MigratorExecutor.bat issues
- Ensure the script is in the project root directory
- Check if the migrator executable exists in Debug or Release folders
- Verify execution permissions



## Best Practices

### 1. Naming Conventions
- Use descriptive names for migrations
- Follow the format: `YYYYMMDD_Description`
- Example: `20240317_AddUserProfileFields`

### 2. Version Control
- Always commit migration files
- Include both Up() and Down() methods
- Document breaking changes

### 3. Testing
- Test migrations on development first
- Generate and review SQL scripts
- Maintain test data sets

### 4. Deployment
- Use idempotent scripts when possible
- Schedule during low-traffic periods
- Have rollback plans ready

