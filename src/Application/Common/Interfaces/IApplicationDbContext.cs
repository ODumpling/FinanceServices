using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }
        DbSet<UserInfo> UserInformation { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
