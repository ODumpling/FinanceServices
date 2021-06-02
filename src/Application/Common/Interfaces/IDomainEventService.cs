using FinanceServices.Domain.Common;
using System.Threading.Tasks;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
