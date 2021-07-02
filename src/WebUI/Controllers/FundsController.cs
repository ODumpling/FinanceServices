using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Application.Funds.Queries.GetFund;
using FinanceServices.Application.Funds.Queries.GetFunds;
using FinanceServices.Application.Memberships.Queries;
using FinanceServices.Application.Transactions.Commands;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<FundVm>> GetFund(string id, [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            return await Mediator.Send(new GetFundQuery
            {
                Id = id,
                PageNumber = page,
                PageSize = pageSize
            });
        }

        [HttpGet("{id}/Members")]
        public async Task<IList<MemberDto>> GetFundMembers(string id)
        {
            return await Mediator.Send(new GetFundMembersQuery
            {
                FundId = id
            });
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateFund(CreateFundCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{id:guid}/Upload/{type}")]
        public async Task<ActionResult> UploadTransactionToFund(string id, string type, IFormFile file)
        {
            await Mediator.Send(new UploadTransactionCommand
            {
                File = file,
                FundId = id,
                Type = type.ToUpper()
            });

            return NoContent();
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