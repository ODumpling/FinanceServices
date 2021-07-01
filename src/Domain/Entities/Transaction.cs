using System;
using System.Collections.Generic;
using FinanceServices.Domain.Common;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Domain.Entities
{
    public class Transaction : AuditableEntity, IHasDomainEvent
    {
        public Guid Id { get; set; }
        public Guid FundId { get; set; }
        public Fund Fund { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public IList<Category> Categories { get; set; } = new List<Category>();
        public IList<CategoryTransaction> CategoryTransactions { get; set; } = new List<CategoryTransaction>();

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}