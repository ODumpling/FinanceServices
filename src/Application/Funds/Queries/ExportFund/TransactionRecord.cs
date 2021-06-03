using System;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Enums;

namespace FinanceServices.Application.Funds.Queries.ExportFund
{
    public class TransactionRecord : IMapFrom<Transaction>
    {
        public Guid Id { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}