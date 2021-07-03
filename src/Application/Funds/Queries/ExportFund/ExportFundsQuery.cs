using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Funds.Queries.ExportFund
{
    public class ExportFundsQuery : IRequest<ExportFundVm>
    {
        public string Id { get; set; }

        public class ExportFundsQueryHandler : IRequestHandler<ExportFundsQuery, ExportFundVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUser;
            private readonly ICsvFileBuilder _fileBuilder;
            private readonly ILogger<ExportFundsQueryHandler> _logger;

            public ExportFundsQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder, ILogger<ExportFundsQueryHandler> logger, ICurrentUserService currentUser)
            {
                _context = context;
                _mapper = mapper;
                _fileBuilder = fileBuilder;
                _logger = logger;
                _currentUser = currentUser;
            }

            public async Task<ExportFundVm> Handle(ExportFundsQuery request, CancellationToken cancellationToken)
            {
                var vm = new ExportFundVm();

                var fund = await _context.Funds.FindAsync(request.Id);

                var records = await _context.Transactions
                    .Where(x => x.FundId == request.Id)
                    .ProjectTo<TransactionRecord>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                vm.Content = _fileBuilder.BuildFundFile(records);
                vm.ContentType = "text/csv";
                vm.FileName = $"Fund-{fund.Name}-{DateTime.Now}.csv";

                _logger.LogInformation("DomainUser with Id:{Id} has exported data from Fund with Id:{FundId}", _currentUser.UserId, request.Id);
                return await Task.FromResult(vm);
            }

           
        }
    }
}