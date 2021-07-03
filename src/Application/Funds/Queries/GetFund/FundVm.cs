using System;
using System.Collections.Generic;
using AutoMapper;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Application.Funds.Queries.GetFund
{
    public class FundVm
    {
        public FundDto Fund { get; set; }
        public IList<TypeDto> TransactionTypes { get; set; }

        public class TypeDto
        {
            public int Value { get; set; }
            public string Name { get; set; }
        }

        public class FundDto : IMapFrom<Fund>
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public decimal Expenses { get; set; }
            public decimal Income { get; set; }
            public decimal Balance { get; set; }
            public IList<TransactionDto> Transactions { get; set; }
            public IList<CategoryDto> Categories { get; set; }
        }

        public class TransactionDto : IMapFrom<Transaction>
        {
            public string Id { get; set; }
            public string Type { get; set; }
            public decimal Amount { get; set; }
            public string Description { get; set; }
            public DateTime Date { get; set; }
            public IList<CategoryDto> Categories { get; set; }
            public void Mapping(Profile profile)
            {
                profile.CreateMap<Transaction, TransactionDto>()
                    .ForMember(x => x.Type, x => x.MapFrom(transaction => (int) transaction.Type));
            }
        }

        public class CategoryDto : IMapFrom<Category>
        {
            public string Id { get; set; }
            public string Name { get; set; }
        }
    }
}