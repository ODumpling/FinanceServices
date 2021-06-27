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
    public class GetAllMembersQuery : IRequest<IList<MemberDto>>
    {
        public string Name { get; set; }

        public class GetAllMembersQueryHandler : IRequestHandler<GetAllMembersQuery, IList<MemberDto>>
        {
            private readonly IApplicationDbContext _context;

            public GetAllMembersQueryHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IList<MemberDto>> Handle(GetAllMembersQuery request, CancellationToken cancellationToken)
            {
                var result = _context.UserClaims
                    .Where(x => x.ClaimType == "name");

                if (!string.IsNullOrEmpty(request.Name))
                {
                    result.Where(x => x.ClaimValue.Contains(request.Name));
                }

                return await result.Select(x => new MemberDto
                    {
                        Id = Guid.Parse(x.UserId),
                        FullName = x.ClaimValue
                    })
                    .ToListAsync(cancellationToken: cancellationToken);

            }
        }
    }
}