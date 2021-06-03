using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Mappings;
using MediatR;

namespace FinanceServices.Application.Funds.Queries.GetFunds
{
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
                var id = Guid.Parse(_userService.UserId);
                var user = await _context.UserInformation.FindAsync(id);
                return new FundsVm
                {
                    Funds = await _context.Funds
                        .Where(x => x.Users.Contains(user))
                        .OrderByDescending(x => x.Created)
                        .ProjectTo<FundsVm.FundDto>(_mapper.ConfigurationProvider)
                        .PaginatedListAsync(request.PageNumber, request.PageSize),
                };
            }
        }
    }
}