using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Models;
using FinanceServices.Domain.Events;
using MediatR;

namespace FinanceServices.Application.Transactions.EventHandlers.TransactionCreatedEvents
{
    public class ScheduleReccuringTransaction : INotificationHandler<DomainEventNotification<TransactionCreatedEvent>>
    {
        private readonly IJobScheduler _jobScheduler;

        public ScheduleReccuringTransaction(IJobScheduler jobScheduler)
        {
            _jobScheduler = jobScheduler;
        }

        public Task Handle(DomainEventNotification<TransactionCreatedEvent> notification,
            CancellationToken cancellationToken)
        {
            
            _jobScheduler.CreateWeeklyTransaction(notification.DomainEvent.Item.Id);

            return Task.CompletedTask;
        }
    }
}