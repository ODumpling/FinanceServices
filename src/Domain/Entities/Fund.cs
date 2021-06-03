using System;
using System.Collections.Generic;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Fund : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ManagerId { get; set; }
        public UserInfo Manager { get; set; }
        public IList<Transaction> Transactions { get; set; } = new List<Transaction>();
        public IList<UserInfo> Users { get; set; } = new List<UserInfo>();
    }
}