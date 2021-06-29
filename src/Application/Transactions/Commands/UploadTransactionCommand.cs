using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Application.Transactions.Commands
{
    public class UploadTransactionCommand : IRequest
    {
        public string Type { get; set; }
        public IFormFile File { get; set; }
        public Guid FundId { get; set; }

        public class UploadTransactionCommandHandler : IRequestHandler<UploadTransactionCommand>
        {
            private readonly ICsvFileBuilder _csvFileBuilder;
            private readonly IApplicationDbContext _context;
            private readonly ILogger<UploadTransactionCommandHandler> _logger;

            public UploadTransactionCommandHandler(ICsvFileBuilder csvFileBuilder,
                ILogger<UploadTransactionCommandHandler> logger, IApplicationDbContext context)
            {
                _csvFileBuilder = csvFileBuilder;
                _logger = logger;
                _context = context;
            }

            public async Task<Unit> Handle(UploadTransactionCommand request, CancellationToken cancellationToken)
            {
                var result = _csvFileBuilder.ReadFileByProvider(request.File, request.Type);

                if (result == null)
                {
                    throw new NotSupportedException();
                }

                var transactions = result.ToList();
                foreach (var item in transactions)
                {
                    item.FundId = request.FundId;
                }

                await _context.Transactions.AddRangeAsync(transactions, cancellationToken);

                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("uploaded {NumberOfRecords} transactions", transactions.Count);

                return Unit.Value;
            }
        }
    }
}