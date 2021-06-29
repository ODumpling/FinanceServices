﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Security;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Funds.Commands
{
    [Authorize]
    public class DeleteFundCommand : IRequest
    {
        public Guid Id { get; set; }

        public class DeleteFundValidator : AbstractValidator<DeleteFundCommand>
        {
            public DeleteFundValidator()
            {
                RuleFor(x => x.Id)
                    .NotNull();
            }
        }

        public class DeleteFundCommandHandler : IRequestHandler<DeleteFundCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _userService;
            private readonly ILogger<DeleteFundCommandHandler> _logger;

            public DeleteFundCommandHandler(IApplicationDbContext context, ICurrentUserService userService,
                ILogger<DeleteFundCommandHandler> logger)
            {
                _context = context;
                _userService = userService;
                _logger = logger;
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
                _logger.LogInformation("User with Id:{Id} has deleted the fund with Id:{FundId}", userguid, fund.Id);

                return Unit.Value;
            }
        }
    }
}