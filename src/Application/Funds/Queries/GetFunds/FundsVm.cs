using System;
using FinanceServices.Application.Common.Mappings;
using FinanceServices.Application.Common.Models;
using FinanceServices.Domain.Entities;

namespace FinanceServices.Application.Funds.Queries.GetFunds
{
    public class FundsVm
    {
        public PaginatedList<FundDto> Funds { get; set; }

        public class FundDto : IMapFrom<Fund>
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
    }
}