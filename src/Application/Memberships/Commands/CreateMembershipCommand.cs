using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Memberships.Commands
{
    public class CreateMembershipCommand : IRequest
    {
        public string UserId { get; set; }
        public string FundId { get; set; }

        public class CreateMembershipCommandHandler : IRequestHandler<CreateMembershipCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<CreateMembershipCommandHandler> _logger;

            public CreateMembershipCommandHandler(IApplicationDbContext context, ILogger<CreateMembershipCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(CreateMembershipCommand request, CancellationToken cancellationToken)
            {
                var membership = new Membership
                {
                    UserId = request.UserId,
                    FundId = request.FundId
                };

                _context.Memberships.Add(membership);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}