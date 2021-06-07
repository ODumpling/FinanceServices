using System;
using AutoMapper;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Application.Common.Models;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Application.Transactions.Queries.ReccuringTransactions
{
    public class RecurringTransactionsVm
    {
        public PaginatedList<TransactionDto> Transactions { get; set; }

        public class TransactionDto : IMapFrom<Transaction>
        {
            public Guid Id { get; set; }
            public Guid FundId { get; set; }
            public string Type { get; set; }
            public decimal Amount { get; set; }
            public string Description { get; set; }
            public DateTime Date { get; set; }

            public void Mapping(Profile profile)
            {
                profile.CreateMap<Transaction, TransactionDto>()
                    .ForMember(x => x.Type, x => x.MapFrom(transaction => (int)transaction.Type));
            }

        }
    }
}