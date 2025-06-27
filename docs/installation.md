---
sidebar_position: 1
---

# Installation Guide

Welcome to our installation guide! This comprehensive guide will walk you through setting up your development environment step by step. Follow these instructions carefully to ensure a successful setup of our platform.


## Prerequisites

Before beginning the installation process, ensure you have the following installed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download) (LTS version 22.0.0 recommended)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) or later
- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) or later
- [SQL Server 2019](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or later



## Clone the Repository

To begin, clone the framework repository and navigate to its root directory:

#### To begin, clone the framework repository and navigate to its root directory:

```bash
git clone <repository-url>
cd UW.Platform
```




## Install Angular Dependencies

Next, install the necessary dependencies for the Angular front end:
#### - Using Dependency Installer

Run `DependencyInstaller.bat` from the solution root.
#### - Manual Dependency Installation
```bash
cd src/WebClients/HostClient
npm install
```


## Database Creation and Seeding

### - Using MigratorExecutor

Run `MigratorExecutor.bat` from the solution root. [How to run Migrator](/docs/database/migrations)

### - Manual Migration
If you prefer manual migration, use the following command:

  ```bash
  dotnet ef Tutorial - Basics update --project src/UW.Platform.Infrastructure --startup-project src/WebApps/UW.Platform.HostApi
  ```

For more details, refer to the [Migration Documentation](/docs/database/migrations).


# Running the Application

## Backend Services

### 1. Set Startup Projects
1. **Open Solution Explorer** in Visual Studio.
2. **Right-click the solution** and select **Set Startup Projects**.
3. In the dialog:
- Choose **Multiple startup projects**.
- Set the following projects to **Start**:
    - `UW.Platform.HostApi`
    - `UW.Platform.TenantApi`

### 2. Configure Launch Settings
- **HostApi** typically runs on: `https://localhost:3100`
- **TenantApi** typically runs on: `https://localhost:4100`

---

## Frontend Application

### 1. Configure the Environment
Update the `environment.ts` file located at `src/WebClients/HostClient/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  baseApiUrl: 'https://localhost:3100',
  hostApiUrl: 'https://localhost:4100'
};
```
