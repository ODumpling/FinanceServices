using System;
using FinanceServices.Domain.Entities;
using FinanceServices.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            var administratorRole = new IdentityRole("Administrator");

            if (roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await roleManager.CreateAsync(administratorRole);
            }

            var administrator = new ApplicationUser
                {UserName = "administrator@localhost", Email = "administrator@localhost"};

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Administrator1!");
                await userManager.AddToRolesAsync(administrator, new[] {administratorRole.Name});
                context.UserInformation.Add(new UserInfo(Guid.Parse(administrator.Id), "App", "Admin",
                    "administrator@localhost"));
                await context.SaveChangesAsync(CancellationToken.None);
            }
        }

        public static async Task SeedSampleDataAsync(UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            var user = context.UserInformation.FirstOrDefault(x => x.Email == "administrator@localhost");
            // Seed, if necessary
            if (!context.Funds.Any())
            {
                if (user != null)
                    context.Add(new Fund
                    {
                        Name = "Bills",
                        ManagerId = user.Id,
                        Users =
                        {
                            user,  
                        },
                        Transactions =
                        {
                            new Transaction{Amount = 50000, Description = "Starting Amount", Type = TransactionType.Income }
                        }
                    });
                await context.SaveChangesAsync();
            }
        }
    }
}