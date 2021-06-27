using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Application.Funds.Queries.GetFund;
using FinanceServices.Application.Funds.Queries.GetFunds;
using FinanceServices.Application.Memberships.Queries;
using Microsoft.AspNetCore.Mvc;

namespace FinanceServices.WebUI.Controllers
{
    public class FundsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<FundsVm>> ListFunds([FromQuery] GetFundsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FundVm>> GetFund(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            return await Mediator.Send(new GetFundQuery
            {
                Id = id,
                PageNumber = page,
                PageSize = pageSize
            });
        }

        [HttpGet("{id}/Members")]
        public async Task<IList<MemberDto>> GetFundMembers(Guid id)
        {
            return await Mediator.Send(new GetFundMembersQuery
            {
                FundId = id
            });
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateFund(CreateFundCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateFund(UpdateFundCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteFund(DeleteFundCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}