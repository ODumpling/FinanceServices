using FinanceServices.Domain.Common;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Domain.Events
{
    public class TodoItemCompletedEvent : DomainEvent
    {
        public TodoItemCompletedEvent(TodoItem item)
        {
            Item = item;
        }

        public TodoItem Item { get; }
    }
}
