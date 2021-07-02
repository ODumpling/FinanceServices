using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Security;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Events;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;


namespace FinanceServices.Application.Funds.Commands
{
    [Authorize]
    public class CreateFundCommand : IRequest<string>
    {
        public string Name { get; set; }

        public class CreateFundCommandValidator : AbstractValidator<CreateFundCommand>
        {
            public CreateFundCommandValidator()
            {
                RuleFor(x => x.Name)
                    .MinimumLength(3)
                    .MaximumLength(20)
                    .NotNull();
            }
        }

        public class CreateFundCommandHandler : IRequestHandler<CreateFundCommand, string>
        {
            private readonly ICurrentUserService _userService;
            private readonly IApplicationDbContext _context;
            private readonly ILogger<CreateFundCommandHandler> _logger;
            public CreateFundCommandHandler(ICurrentUserService userService, IApplicationDbContext context, ILogger<CreateFundCommandHandler> logger)
            {
                _userService = userService;
                _context = context;
                _logger = logger;
            }

            public async Task<string> Handle(CreateFundCommand request, CancellationToken cancellationToken)
            {
                var fund = new Fund
                {
                    ManagerId = _userService.UserId,
                    Name = request.Name,
                    Balance = 0,
                    Expenses = 0,
                    Income = 0,
                };

                fund.DomainEvents.Add(new FundCreatedEvent(fund));
                _context.Funds.Add(fund);
                await _context.SaveChangesAsync(cancellationToken);
                var userid = _userService.UserId;

                _logger.LogInformation("User with Id:{Id} created a new Fund with FundId:{FundId}", userid , fund.Id);

                return fund.Id;
            }
        }
    }
}