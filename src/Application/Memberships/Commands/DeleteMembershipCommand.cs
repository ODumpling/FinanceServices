using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Transactions.Commands;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Memberships.Commands
{
    public class DeleteMembershipCommand : IRequest
    {
        public string FundId { get; set; }
        public string UserId { get; set; }

        public class DeleteMembershipCommandHandler : IRequestHandler<DeleteMembershipCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<DeleteMembershipCommandHandler> _logger;

            public DeleteMembershipCommandHandler(IApplicationDbContext context, ILogger<DeleteMembershipCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(DeleteMembershipCommand request, CancellationToken cancellationToken)
            {
                var membership = await _context.Memberships
                    .Where(x => x.FundId == request.FundId)
                    .Where(x => x.UserId == request.UserId)
                    .Include(x => x.Fund)
                    .SingleOrDefaultAsync(cancellationToken: cancellationToken);

                if (membership.Fund.ManagerId == request.UserId)
                {
                    throw new ValidationException("Cannot remove Manager from Fund");
                }


                _context.Memberships.Remove(membership);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}