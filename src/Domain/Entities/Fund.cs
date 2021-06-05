using System;
using System.Collections.Generic;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Fund : AuditableEntity, IHasDomainEvent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Expenses { get; set; }
        public decimal Income { get; set; }
        public decimal Balance { get; set; }
        public Guid ManagerId { get; set; }
        public UserInfo Manager { get; set; }
        public IList<Transaction> Transactions { get; set; } = new List<Transaction>();
        public IList<UserInfo> Users { get; set; } = new List<UserInfo>();
        public IList<Membership> Memberships { get; set; } = new List<Membership>();
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}