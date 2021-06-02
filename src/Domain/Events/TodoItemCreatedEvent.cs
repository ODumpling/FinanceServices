using FinanceServices.Domain.Common;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Domain.Events
{
    public class TodoItemCreatedEvent : DomainEvent
    {
        public TodoItemCreatedEvent(TodoItem item)
        {
            Item = item;
        }

        public TodoItem Item { get; }
    }
}
