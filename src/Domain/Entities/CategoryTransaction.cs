using System;

namespace FinanceServices.Domain.Entities
{
    public class CategoryTransaction
    {
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        public string TransactionId { get; set; }
        public Transaction Transaction { get; set; }
    }
}