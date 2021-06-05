using FinanceServices.Domain.Common;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Domain.Events
{
    public class TransactionCreatedEvent : DomainEvent
    {
        public TransactionCreatedEvent(Transaction item)
        {
            Item = item;
        }
        public Transaction Item { get; set; }
    }
}