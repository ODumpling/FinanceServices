using System;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Infrastructure.Files.UploadTypes
{
    public class TransactionUploadDto
    {
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }


        public Transaction MapToTransaction()
        {
            var transactType = TransactionType.Expense;

            if (Type.ToUpper() == "INCOME")
            {
                transactType = TransactionType.Income;
            }

            var result = new Transaction
            {
                Description = Description,
                Type = transactType,
                Amount = Amount,
                Created = Date,
            };

            return result;
        }
    }
}