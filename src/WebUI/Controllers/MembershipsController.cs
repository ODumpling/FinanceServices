using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceServices.Application.Memberships.Commands;
using FinanceServices.Application.Memberships.Queries;
using Microsoft.AspNetCore.Mvc;

namespace FinanceServices.WebUI.Controllers
{
    public class MembershipsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IList<MemberDto>> GetMembers([FromQuery]GetAllMembersQuery query)
        {
            return await Mediator.Send(query);
        }
        //
        // [HttpGet("{id}")]
        // public Task<ActionResult> GetMembership()
        // {
        //     throw new NotImplementedException();
        // }

        [HttpPost]
        public async Task<ActionResult> CreateMembership(CreateMembershipCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // [HttpPatch]
        // public Task<ActionResult> UpdateMembership()
        // {
        //     throw new NotImplementedException();
        // }

        [HttpDelete]
        public async Task<ActionResult> DeleteMembership(DeleteMembershipCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}