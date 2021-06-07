using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Common.Mappings;
using MediatR;

namespace FinanceServices.Application.Transactions.Queries.ReccuringTransactions
{
    public class RecurringTransactionsQuery : IRequest<RecurringTransactionsVm>
    {
        public Guid FundId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }


        public class RecurringTransactionsQueryHandler : IRequestHandler<RecurringTransactionsQuery, RecurringTransactionsVm>
        {
            private readonly IJobScheduler _jobScheduler;
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public RecurringTransactionsQueryHandler(IJobScheduler jobScheduler, IApplicationDbContext context,
                IMapper mapper)
            {
                _jobScheduler = jobScheduler;
                _context = context;
                _mapper = mapper;
            }

            public async Task<RecurringTransactionsVm> Handle(RecurringTransactionsQuery request,
                CancellationToken cancellationToken)
            {
                var jobs = await _jobScheduler.GetListOfJobs();

                var transactions = await _context.Transactions
                    .Where(x => x.FundId == request.FundId)
                    .Where(x => jobs.Contains(x.Id.ToString()))
                    .OrderBy(x => x.Created)
                    .ProjectTo<RecurringTransactionsVm.TransactionDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.Page, request.PageSize);

                return new RecurringTransactionsVm
                {
                    Transactions = transactions,
                };
            }
        }
    }
}