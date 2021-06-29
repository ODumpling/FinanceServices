using System;
using CsvHelper.Configuration.Attributes;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Infrastructure.Files.UploadTypes
{
    public class MonzoTransactionUploadDto
    {
        [Name("Transaction ID")] public string TransactionId { get; set; }
        [Name("Date")] public DateTime Date { get; set; }
        [Name("Time")] public string Time { get; set; }
        [Name("Type")] public string Type { get; set; }
        [Name("Name")] public string Name { get; set; }
        [Name("Emoji")] public string Emoji { get; set; }
        [Name("Category")] public string Category { get; set; }
        [Name("Amount")] public string Amount { get; set; }
        [Name("Currency")] public string Currency { get; set; }
        [Name("Local amount")] public string LocalAmount { get; set; }
        [Name("Local currency")] public string LocalCurrency { get; set; }
        [Name("Notes and #tags")] public string NotesAndTags { get; set; }
        [Name("Address")] public string Address { get; set; }
        [Name("Receipt")] public string Receipt { get; set; }
        [Name("Description")] public string Description { get; set; }
        [Name("Category split")] public string CategorySplit { get; set; }
        [Name("Money Out")] public decimal MoneyOut { get; set; }
        [Name("Money In")] public decimal MoneyIn { get; set; }


        public Transaction MapToTransaction()
        {
            var transactType = TransactionType.Expense;
            var amount = MoneyOut;

            if (MoneyOut == Decimal.Zero)
            {
                transactType = TransactionType.Income;
                amount = MoneyIn;
            }

            var result = new Transaction
            {
                Description = Description,
                Type = transactType,
                Amount = amount,
                Created = Date,
            };

            return result;
        }
    }
}