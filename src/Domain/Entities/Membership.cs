using System;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Membership : AuditableEntity
    {
        public Guid FundId { get; set; }
        public Fund Fund { get; set; }
        public Guid UserId { get; set; }
        public UserInfo User { get; set; }
    }
}