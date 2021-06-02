using FinanceServices.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
