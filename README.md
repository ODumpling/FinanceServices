## Finance Services
Based of the [Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture) by jason taylor

## Getting Started

The easiest way to get started is to follow the below:

1. Install the latest [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
2. Install the latest [Node.js LTS](https://nodejs.org/en/)
3. Clone the repo
4. Navigate to `src/WebUI/ClientApp` and run `npm install`
5. Navigate to `src/WebUI/ClientApp` and run `npm start` to launch the front end (React)
6. Navigate to `src/WebUI` and run `dotnet run` to launch the back end (ASP.NET Core Web API)



## Technologies

* ASP.NET Core 5
* [Entity Framework Core 5](https://docs.microsoft.com/en-us/ef/core/)
* [Identity Server 4](https://github.com/IdentityServer/IdentityServer4)
* [React](https://reactjs.org/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) & [Respawn](https://github.com/jbogard/Respawn)
* [Docker](https://www.docker.com/)

## Development

### Database Configuration

The project is configured to use an in-memory database by default. This ensures that all users will be able to run the solution without needing to set up additional infrastructure (e.g. SQL Server).

But for Development you will need to use SQL Server, you will need to create **src/WebUI/appsettings.local.json** and add the following json to it:

```json
{
  "UseInMemoryDatabase": false,
  "ConnectionStrings": {
    "DefaultConnection": "Add_Your_Dev_Server"
  }
}
```
This will ensure your local development environment is separate for each dev and doesnt get uploaded.

### Database Migrations
Make sure you have [efcore tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet).

If you need to generate a new migration please use the below as an example.
This will create the necessary files within the Infrastructure project.

```powershell
dotnet ef migrations add "REPLACE_WITH_MIGRATION_NAME" --project src/Infrastructure --startup-project src/WebUI --output-dir Persistence/Migrations
```
 
To roll back the previous migration the following could be used.
```powershell
 dotnet ef migrations remove --project src/Infrastructure --startup-project src/WebUI
```
