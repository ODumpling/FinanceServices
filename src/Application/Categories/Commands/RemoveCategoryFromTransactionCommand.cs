using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceServices.Application.Categories.Commands
{
    public class RemoveCategoryFromTransactionCommand : IRequest
    {
        public string TransactionId { get; set; }

        public string CategoryId { get; set; }

        public class RemoveCategoryFromTransactionCommandHandler: IRequestHandler<RemoveCategoryFromTransactionCommand>
        {
            private readonly IApplicationDbContext _context;

            public RemoveCategoryFromTransactionCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(RemoveCategoryFromTransactionCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.CategoryTransactions
                    .Where(x => x.CategoryId == request.CategoryId)
                    .Where(x => x.TransactionId == request.TransactionId)
                    .SingleOrDefaultAsync(cancellationToken: cancellationToken);

                _context.CategoryTransactions.Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}