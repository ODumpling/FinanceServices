using System.Collections.Generic;

namespace FinanceServices.Application.Memberships.Queries
{
    public class GetFundMembersVm
    {
        public IList<MemberDto> Members { get; set; }
    }
}