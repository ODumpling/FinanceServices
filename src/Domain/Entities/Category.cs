using System;
using System.Collections.Generic;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Category : AuditableEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FundId { get; set; }
        public Fund Fund { get; set; }

        public IList<Transaction> Transactions { get; set; } = new List<Transaction>();
        public IList<CategoryTransaction> CategoryTransactions { get; set; } = new List<CategoryTransaction>();
    }
}