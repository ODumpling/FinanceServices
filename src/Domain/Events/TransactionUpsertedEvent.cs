using FinanceServices.Domain.Common;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Domain.Events
{
    public class TransactionUpsertedEvent : DomainEvent
    {
        public TransactionUpsertedEvent(Transaction item)
        {
            Item = item;
        }
        public Transaction Item { get; set; }
    }
}