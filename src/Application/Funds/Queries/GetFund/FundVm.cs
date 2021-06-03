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

        public class FundDto : IMapFrom<Fund>
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public IList<TransactionDto> Transactions { get; set; }
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
                    .ForMember(x => x.Type, x => x.MapFrom(x => (int) x.Type));
            }
        }
    }
}