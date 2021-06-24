using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Transactions.Commands
{
    public class CreateTransactionSubscription : IRequest
    {
        public Guid Id { get; set; }
        public string Type { get; set; }

        public class CreateTransactionSubscriptionHandler : IRequestHandler<CreateTransactionSubscription>
        {
            private readonly IJobScheduler _scheduler;

            public CreateTransactionSubscriptionHandler(IJobScheduler scheduler)
            {
                _scheduler = scheduler;
            }

            public async Task<Unit> Handle(CreateTransactionSubscription request, CancellationToken cancellationToken)
            {
                var subType = request.Type.ToUpperInvariant();

                switch (subType)
                {
                    case "WEEKLY" :
                        await _scheduler.CreateWeeklyTransaction(request.Id);
                        break;

                    case "MONTHLY" :
                        await _scheduler.CreateMonthlyTransaction(request.Id);
                        break;
                    default:
                        
                        break;
                }

                return Unit.Value;
            }
        }
    }
}