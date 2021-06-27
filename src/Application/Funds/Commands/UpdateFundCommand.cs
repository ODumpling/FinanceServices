using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Funds.Commands
{
    public class UpdateFundCommand : IRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public class UpdateFundCommandHandler : IRequestHandler<UpdateFundCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<UpdateFundCommandHandler> _logger;

            public UpdateFundCommandHandler(IApplicationDbContext context, ILogger<UpdateFundCommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(UpdateFundCommand request, CancellationToken cancellationToken)
            {
                var fund = await _context.Funds.Where(x => x.Id == request.Id)
                    .SingleOrDefaultAsync(cancellationToken: cancellationToken);
                fund.Name = request.Name;
                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("Fund with Id:{FundId} has been updated", fund.Id);

                return Unit.Value;
            }
        }
    }
}