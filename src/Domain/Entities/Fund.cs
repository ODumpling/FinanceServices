using System;
using System.Collections.Generic;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Fund : AuditableEntity, IHasDomainEvent
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Expenses { get; set; }
        public decimal Income { get; set; }
        public decimal Balance { get; set; }
        public string ManagerId { get; set; }
        public DomainUser Manager { get; set; }
        public IList<Transaction> Transactions { get; set; } = new List<Transaction>();
        public IList<DomainUser> Users { get; set; } = new List<DomainUser>();
        public IList<Membership> Memberships { get; set; } = new List<Membership>();
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}