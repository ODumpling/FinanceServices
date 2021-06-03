using System;
using FinanceServices.Domain.Common;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Domain.Entities
{
    public class Transaction : AuditableEntity
    {
        public Guid Id { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}