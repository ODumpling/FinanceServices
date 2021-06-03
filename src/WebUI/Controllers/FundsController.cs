using System;
using System.Threading.Tasks;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Application.Funds.Queries.GetFund;
using FinanceServices.Application.Funds.Queries.GetFunds;
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
        public async Task<ActionResult<FundVm>> GetFund(Guid id)
        {
            return await Mediator.Send(new GetFundQuery{FundId = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateFund(CreateFundCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // [HttpPatch]
        // public Task<ActionResult> UpdateFund()
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpDelete]
        // public Task<ActionResult> DeleteFund()
        // {
        //     throw new NotImplementedException();
        // }
    }
}