using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Transactions.Commands
{
    public class DeleteTransactionCommand : IRequest
    {
        public string Id { get; set; }

        public class DeleteTransactionCommandValidator : AbstractValidator<DeleteTransactionCommand>
        {
            public DeleteTransactionCommandValidator()
            {
                RuleFor(x => x.Id)
                    .NotNull();
            }
        }

        public class DeleteTransactionCommandHandler : IRequestHandler<DeleteTransactionCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<DeleteTransactionCommandHandler> _logger;

            public DeleteTransactionCommandHandler(IApplicationDbContext context,
                ILogger<DeleteTransactionCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
            {
                var transaction = await _context.Transactions.Where(x => x.Id == request.Id).SingleOrDefaultAsync();

                _context.Transactions.Remove(transaction);

                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("Transaction with Id:{Id} has been deleted", transaction.Id);

                return Unit.Value;
            }
        }
    }
}