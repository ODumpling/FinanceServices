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
    public class UpdateTransactionCommand : IRequest<string>
    {
        public string Id { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public class UpdateTransactionCommandHandler : IRequestHandler<UpdateTransactionCommand, string>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<UpdateTransactionCommandHandler> _logger;

            public UpdateTransactionCommandHandler(IApplicationDbContext context,
                ILogger<UpdateTransactionCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<string> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
            {
                var transaction = await _context.Transactions.FindAsync(request.Id);

                if (transaction == null)
                {
                    throw new NotFoundException(nameof(Transaction), request.Id);
                }

                transaction.Amount = request.Amount;
                transaction.Type = request.Type;
                transaction.Description = request.Description;
                transaction.Date = request.Date;

                transaction.DomainEvents.Add(new TransactionUpsertedEvent(transaction));

                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("Transaction has been updated with Id:{Id}", transaction.Id);

                return transaction.Id;
            }
        }
    }
}