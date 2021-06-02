using FinanceServices.Application.Common.Mappings;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Application.TodoLists.Queries.ExportTodos
{
    public class TodoItemRecord : IMapFrom<TodoItem>
    {
        public string Title { get; set; }

        public bool Done { get; set; }
    }
}
