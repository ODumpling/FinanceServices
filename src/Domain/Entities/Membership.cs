using System;
using FinanceServices.Domain.Common;

namespace FinanceServices.Domain.Entities
{
    public class Membership : AuditableEntity
    {
        public string FundId { get; set; }
        public Fund Fund { get; set; }
        public string UserId { get; set; }
        public UserInfo User { get; set; }
    }
}