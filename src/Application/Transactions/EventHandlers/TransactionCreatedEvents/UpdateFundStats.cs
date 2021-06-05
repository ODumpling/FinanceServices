using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Models;
using FinanceServices.Application.Funds.EventHandlers.FundCreatedEvents;
using FinanceServices.Domain.Enums;
using FinanceServices.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Transactions.EventHandlers.TransactionCreatedEvents
{
    public class UpdateFundStats : INotificationHandler<DomainEventNotification<TransactionCreatedEvent>>
    {

        private readonly IApplicationDbContext _context;
        private readonly ILogger<UpdateFundStats> _logger;

        public UpdateFundStats(IApplicationDbContext context, ILogger<UpdateFundStats> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Handle(DomainEventNotification<TransactionCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;
            _logger.LogInformation("FinanceServices Domain Event: {DomainEvent}", domainEvent.GetType().Name);

            var fund = await _context.Funds.FindAsync(domainEvent.Item.FundId);
            var transaction = domainEvent.Item;

            if (transaction.Type == TransactionType.Income)
            {
                fund.Income += transaction.Amount;
            }
            else
            {
                fund.Expenses += transaction.Amount;
            }

            fund.Balance = fund.Income - fund.Expenses;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}