using System;
using System.Collections.Generic;
using FinanceServices.Domain.Entities;
using FinanceServices.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Domain.Enums;
using IdentityModel;

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
                await userManager.AddClaimsAsync(administrator, claims());
                context.DomainUsers.Add(new DomainUser
                {
                    Id = administrator.Id
                });
                await context.SaveChangesAsync(CancellationToken.None);
            }
        }

        private static IEnumerable<Claim> claims()
        {
            yield return new Claim(JwtClaimTypes.Name, "Dev Admin");
            yield return new Claim(JwtClaimTypes.GivenName, "Dev");
            yield return new Claim(JwtClaimTypes.FamilyName, "Admin");
            yield return new Claim(JwtClaimTypes.Email, "administrator@localhost");
        }

        public static async Task SeedSampleDataAsync(UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            var user = userManager.Users.FirstOrDefault(x => x.Email == "administrator@localhost");
            var domainuser = context.DomainUsers.FirstOrDefault(x => x.Id == user.Id);
            // Seed, if necessary
            if (!context.Funds.Any())
            {
                if (user != null && domainuser != null)
                {
                    for (int i = 0; i < 20; i++)
                    {
                        context.Funds.Add(new Fund
                        {
                            Name = "Bills",
                            ManagerId = domainuser.Id,
                            Balance = 50000,
                            Users =
                            {
                                domainuser,
                            },
                            Transactions =
                            {
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                                new Transaction
                                {
                                    Amount = 500, Description = "Starting Amount", Type = TransactionType.Income,
                                    Date = DateTime.Now
                                },
                            }
                        });
                    }

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}