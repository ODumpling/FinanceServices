using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Application.Common.Security;
using MediatR;

namespace FinanceServices.Application.Funds.Queries.GetFunds
{
    [Authorize]
    public class GetFundsQuery : IRequest<FundsVm>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public class GetFundsQueryHandler : IRequestHandler<GetFundsQuery, FundsVm>
        {
            private readonly ICurrentUserService _userService;
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetFundsQueryHandler(IApplicationDbContext context, ICurrentUserService userService, IMapper mapper)
            {
                _context = context;
                _userService = userService;
                _mapper = mapper;
            }

            public async Task<FundsVm> Handle(GetFundsQuery request, CancellationToken cancellationToken)
            {
                var funds = await _context.Funds
                    .Where(x => x.Memberships.Any(x=> x.UserId == _userService.UserId))
                    .OrderBy(x => x.Created)
                    .ProjectTo<FundsVm.FundDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);

                return new FundsVm
                {
                    Funds = funds,
                };
            }
        }
    }
}