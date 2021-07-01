using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Category> Categories { get; set; }
        DbSet<CategoryTransaction> CategoryTransactions { get; set; }
        DbSet<Fund> Funds { get; set; }
        DbSet<Membership> Memberships { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        DbSet<UserInfo> UserInformation { get; set; }
        DbSet<IdentityUserClaim<string>> UserClaims { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
