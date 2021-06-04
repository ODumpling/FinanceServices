using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Models;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Funds.EventHandlers.FundCreatedEvents
{
    public class AddManagerToFundMembership : INotificationHandler<DomainEventNotification<FundCreatedEvent>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ILogger<AddManagerToFundMembership> _logger;

        public AddManagerToFundMembership(ILogger<AddManagerToFundMembership> logger, IApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task Handle(DomainEventNotification<FundCreatedEvent> notification,
            CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;
            _logger.LogInformation("FinanceServices Domain Event: {DomainEvent}", domainEvent.GetType().Name);
            var entity = notification.DomainEvent.Item;
            _context.Memberships.Add(new Membership {UserId = entity.ManagerId, FundId = entity.Id});
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}