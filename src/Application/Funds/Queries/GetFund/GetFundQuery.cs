﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceServices.Application.Funds.Queries.GetFund
{
    public class GetFundQuery : IRequest<FundVm>
    {
        public Guid Id { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

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
                var transactions = await _context.Transactions
                    .Where(x => x.FundId == request.Id)
                    .OrderBy(x => x.Created)
                    .ProjectTo<FundVm.TransactionDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);

                var funds = await _context.Funds
                    .Where(x => x.Id == request.Id)
                    .OrderBy(x => x.Created)
                    .ProjectTo<FundVm.FundDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();


                return new FundVm
                {
                    Fund = funds,

                    Transactions = transactions,

                    TransactionTypes = Enum.GetValues(typeof(TransactionType))
                        .Cast<TransactionType>()
                        .Select(p => new FundVm.TypeDto() {Value = (int) p, Name = p.ToString()}).ToList(),
                };
            }
        }
    }
}