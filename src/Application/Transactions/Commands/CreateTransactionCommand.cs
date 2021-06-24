using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Enums;
using FinanceServices.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Transactions.Commands
{
    public class CreateTransactionCommand : IRequest<Guid>
    {
        public Guid FundId { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public class CreateTransactionCommandHandler : IRequestHandler<CreateTransactionCommand, Guid>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<CreateTransactionCommandHandler> _logger;

            public CreateTransactionCommandHandler(IApplicationDbContext context,
                ILogger<CreateTransactionCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Guid> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
            {
                var fund = await _context.Funds.FindAsync(request.FundId);

                if (fund == null)
                {
                    throw new NotFoundException(nameof(Fund), request.FundId);
                }

                var transaction = new Transaction
                {
                    Amount = request.Amount,
                    Type = request.Type,
                    Description = request.Description,
                    Date = request.Date,
                };

                transaction.DomainEvents.Add(new TransactionCreatedEvent(transaction));

                fund.Transactions.Add(transaction);

                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("Transaction has been created with Id:{Id}", transaction.Id);
                
                return transaction.Id;
            }
        }
    }
}