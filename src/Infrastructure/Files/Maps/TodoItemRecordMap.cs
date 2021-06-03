using FinanceServices.Application.TodoLists.Queries.ExportTodos;
using CsvHelper.Configuration;
using System.Globalization;
using FinanceServices.Application.Funds.Queries.ExportFund;

namespace FinanceServices.Infrastructure.Files.Maps
{
    public class TodoItemRecordMap : ClassMap<TodoItemRecord>
    {
        public TodoItemRecordMap()
        {
            AutoMap(CultureInfo.InvariantCulture);
            Map(m => m.Done).ConvertUsing(c => c.Done ? "Yes" : "No");
        }
    }

    public class TransactionRecordMap : ClassMap<TransactionRecord>
    {
        public TransactionRecordMap()
        {
            AutoMap(CultureInfo.InvariantCulture);
            Map(m => m.Type).ConvertUsing(c => c.Type == 0 ? "Expense" : "Income");
        }
    }
}
