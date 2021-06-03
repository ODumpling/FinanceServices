using System;
using System.Threading.Tasks;
using FinanceServices.Application.Transactions.Commands;
using Microsoft.AspNetCore.Mvc;

namespace FinanceServices.WebUI.Controllers
{
    public class TransactionsController : ApiControllerBase
    {
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<string>> CreateTransaction(CreateTransactionCommand command)
        {
            return await Mediator.Send(command);
        }

        // [HttpGet]
        // public Task<ActionResult> ListTransactions()
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpGet("{id}")]
        // public Task<ActionResult> GetTransaction()
        // {
        //     throw new NotImplementedException();
        // }

        // [HttpPatch]
        // public Task<ActionResult> UpdateTransaction()
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpDelete]
        // public Task<ActionResult> DeleteTransaction()
        // {
        //     throw new NotImplementedException();
        // }
    }
}