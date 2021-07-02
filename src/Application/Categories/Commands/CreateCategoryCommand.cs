using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using MediatR;

namespace FinanceServices.Application.Categories.Commands
{
    public class CreateCategoryCommand : IRequest
    {
        public string Name { get; set; }
        public string FundId { get; set; }

        public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand>
        {
            private readonly IApplicationDbContext _context;

            public CreateCategoryCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = new Category
                {
                    Name = request.Name,
                    FundId = request.FundId
                };

                _context.Categories.Add(category);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}