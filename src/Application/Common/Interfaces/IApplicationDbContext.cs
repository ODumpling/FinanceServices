using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Fund> Funds { get; set; }
        DbSet<Membership> Memberships { get; set; }
        DbSet<TodoList> TodoLists { get; set; }
        DbSet<TodoItem> TodoItems { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        DbSet<UserInfo> UserInformation { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
