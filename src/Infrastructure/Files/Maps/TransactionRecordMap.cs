using System.Globalization;
using CsvHelper.Configuration;
using FinanceServices.Application.Funds.Queries.ExportFund;

namespace FinanceServices.Infrastructure.Files.Maps
{
    public class TransactionRecordMap : ClassMap<TransactionRecord>
    {
        public TransactionRecordMap()
        {
            AutoMap(CultureInfo.InvariantCulture);
            Map(m => m.Type).ConvertUsing(c => c.Type == 0 ? "Expense" : "Income");
        }
    }
}