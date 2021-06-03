using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceServices.Application.Funds.Queries.GetFund
{
    public class GetFundQuery : IRequest<FundVm>
    {
        public Guid FundId { get; set; }
        public class GetFundQueryHandler : IRequestHandler<GetFundQuery, FundVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetFundQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<FundVm> Handle(GetFundQuery request, CancellationToken cancellationToken)
            {
                return new FundVm
                {
                    Fund = await _context.Funds.Where(x => x.Id == request.FundId)
                        .ProjectTo<FundVm.FundDto>(_mapper.ConfigurationProvider)
                        .SingleOrDefaultAsync(),
                };
            }
        }
    }
}