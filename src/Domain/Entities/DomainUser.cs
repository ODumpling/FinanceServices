using System;
using System.Collections.Generic;

namespace FinanceServices.Domain.Entities
{
    public class DomainUser
    {
        public string Id { get; set; }
        public IList<Fund> Funds { get; set; } = new List<Fund>();
        public IList<Fund> ManagingFunds { get; set; } = new List<Fund>();
        public IList<Membership> Memberships { get; set; } = new List<Membership>();

    }
}