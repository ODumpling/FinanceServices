using FinanceServices.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;
using FinanceServices.Application.Funds.Queries.ExportFund;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
        byte[] BuildFundFile(IEnumerable<TransactionRecord> records);
    }
}
