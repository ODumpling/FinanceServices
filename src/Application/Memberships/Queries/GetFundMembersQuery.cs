using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceServices.Application.Memberships.Queries
{
    public class GetFundMembersQuery : IRequest<IList<MemberDto>>
    {
        public Guid FundId { get; set; }

        public class GetFundMemberQueryHandler : IRequestHandler<GetFundMembersQuery, IList<MemberDto>>
        {
            private readonly IApplicationDbContext _context;

            public GetFundMemberQueryHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IList<MemberDto>> Handle(GetFundMembersQuery request, CancellationToken cancellationToken)
            {
                var users = await _context.Memberships
                    .Where(x => x.FundId == request.FundId)
                    .Select(x => x.UserId.ToString())
                    .ToListAsync(cancellationToken: cancellationToken);

                var result = await _context.UserClaims
                    .Where(x => x.ClaimType == "name")
                    .Where(x => users.Any(u => u == x.UserId))
                    .Select(x => new MemberDto
                    {
                        Id = Guid.Parse(x.UserId),
                        FullName = x.ClaimValue
                    })
                    .ToListAsync(cancellationToken: cancellationToken);

                return result;
            }
        }
    }
}