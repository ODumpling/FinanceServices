using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Events;
using MediatR;

namespace FinanceServices.Application.Funds.Commands
{
    public class CreateFundCommand : IRequest<Guid>
    {
        public string Name { get; set; }

        public class CreateFundCommandHandler : IRequestHandler<CreateFundCommand, Guid>
        {
            private readonly ICurrentUserService _userService;
            private readonly IApplicationDbContext _context;

            public CreateFundCommandHandler(ICurrentUserService userService, IApplicationDbContext context)
            {
                _userService = userService;
                _context = context;
            }

            public async Task<Guid> Handle(CreateFundCommand request, CancellationToken cancellationToken)
            {
                var fund = new Fund
                {
                    ManagerId = Guid.Parse(_userService.UserId),
                    Name = request.Name,
                    Balance = 0,
                    Expenses = 0,
                    Income = 0,
                };

                fund.DomainEvents.Add(new FundCreatedEvent(fund));
                _context.Funds.Add(fund);
                await _context.SaveChangesAsync(cancellationToken);

                return fund.Id;
            }
        }
    }
}