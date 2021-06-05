using System.Collections.Generic;
using FinanceServices.Application.Funds.Queries.ExportFund;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildFundFile(IEnumerable<TransactionRecord> records);
    }
}
