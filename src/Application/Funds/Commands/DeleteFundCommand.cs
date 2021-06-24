using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Security;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceServices.Application.Funds.Commands
{
    [Authorize]
    public class DeleteFundCommand : IRequest
    {
        public Guid Id { get; set; }

        public class DeleteFundValidtor : AbstractValidator<DeleteFundCommand>
        {
            public DeleteFundValidtor()
            {
                RuleFor(x => x.Id)
                    .NotNull();
            }
        }

        public class DeleteFundCommandHandler : IRequestHandler<DeleteFundCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _userService;
            public DeleteFundCommandHandler(IApplicationDbContext context, ICurrentUserService userService)
            {
                _context = context;
                _userService = userService;
            }

            public async Task<Unit> Handle(DeleteFundCommand request, CancellationToken cancellationToken)
            {
                var userguid = Guid.Parse(_userService.UserId);

                var fund = await _context.Funds
                    .Where(x => x.Id == request.Id)
                    .Where(x => x.ManagerId == userguid).FirstOrDefaultAsync(cancellationToken: cancellationToken);

                if (fund == null)
                {
                    throw new NotFoundException("Fund Not Found or You are not the Manager or the Fund");
                }

                _context.Funds.Remove(fund);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}