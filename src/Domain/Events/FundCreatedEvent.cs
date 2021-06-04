using FinanceServices.Domain.Common;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Domain.Events
{
    public class FundCreatedEvent : DomainEvent
    {
        public FundCreatedEvent(Fund item)
        {
            Item = item;
        }
        public Fund Item { get; set; }
    }
}