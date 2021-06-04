using System;
using System.Collections.Generic;
using AutoMapper;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Application.Common.Models;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Application.Funds.Queries.GetFund
{
    public class FundVm
    {
        public FundDto Fund { get; set; }
        public PaginatedList<TransactionDto> Transactions { get; set; }
        public IList<TypeDto> TransactionTypes { get; set; }

        public class TypeDto
        {
            public int Value { get; set; }
            public string Name { get; set; }
        }

        public class FundDto : IMapFrom<Fund>
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
        
        public class TransactionDto : IMapFrom<Transaction>
        { 
            public Guid Id { get; set; }
            public string Type { get; set; }
            public decimal Amount { get; set; }
            public string Description { get; set; }

            public void Mapping(Profile profile)
            {
                profile.CreateMap<Transaction, TransactionDto>()
                    .ForMember(x => x.Type, x => x.MapFrom(transaction => (int)transaction.Type));
            }
        }
    }
}