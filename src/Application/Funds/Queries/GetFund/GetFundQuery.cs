using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Security;
using FinanceServices.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Funds.Queries.GetFund
{
    [Authorize]
    public class GetFundQuery : IRequest<FundVm>
    {
        public string Id { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetFundQueryHandler : IRequestHandler<GetFundQuery, FundVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<GetFundQueryHandler> _logger;

            public GetFundQueryHandler(IApplicationDbContext context, IMapper mapper, ILogger<GetFundQueryHandler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<FundVm> Handle(GetFundQuery request, CancellationToken cancellationToken)
            {
                var funds = await _context.Funds
                    .Where(x => x.Id == request.Id)
                    .OrderBy(x => x.Created)
                    .ProjectTo<FundVm.FundDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();

                return new FundVm
                {
                    Fund = funds,

                    TransactionTypes = Enum.GetValues(typeof(TransactionType))
                        .Cast<TransactionType>()
                        .Select(p => new FundVm.TypeDto() {Value = (int) p, Name = p.ToString()}).ToList(),
                };
            }
        }
    }
}