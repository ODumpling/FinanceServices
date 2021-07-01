using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using MediatR;

namespace FinanceServices.Application.Categories.Commands
{
    public class AddCategoryToTransactionCommand : IRequest
    {

        public Guid TransactionId { get; set; }

        public string CategoryId { get; set; }
        

        public class AddCategoryToTransactionCommandHandler : IRequestHandler<AddCategoryToTransactionCommand>
        {
            private readonly IApplicationDbContext _context;

            public AddCategoryToTransactionCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(AddCategoryToTransactionCommand request, CancellationToken cancellationToken)
            {
                var entity = new CategoryTransaction
                {
                    TransactionId = request.TransactionId,
                    CategoryId = request.CategoryId
                };

                _context.CategoryTransactions.Add(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }

    }
}