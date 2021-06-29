using System.Collections.Generic;
using FinanceServices.Application.Funds.Queries.ExportFund;
using FinanceServices.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildFundFile(IEnumerable<TransactionRecord> records);

        IEnumerable<T> ReadFile<T>(IFormFile file);

        IEnumerable<Transaction> ReadFileByProvider(IFormFile file, string type = null);
    }
}
