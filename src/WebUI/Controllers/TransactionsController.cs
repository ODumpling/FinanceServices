using System;
using System.Threading.Tasks;
using FinanceServices.Application.Transactions.Commands;
using FinanceServices.Application.Transactions.Queries.ReccuringTransactions;
using Microsoft.AspNetCore.Mvc;

namespace FinanceServices.WebUI.Controllers
{
    public class TransactionsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateTransaction(CreateTransactionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("subscription")]
        public async Task<ActionResult> CreateTransactionSubscription(CreateTransactionSubscription command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpGet("subscriptions/{id}")]
        public async Task<ActionResult<RecurringTransactionsVm>> ListRecurringTransactions(Guid id,
            [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            return await Mediator.Send(new RecurringTransactionsQuery
            {
                FundId = id,
                Page = page,
                PageSize = pageSize,
            });
        }

        // [HttpGet("{id}")]
        // public Task<ActionResult> GetTransaction()
        // {
        //     throw new NotImplementedException();
        // }

        [HttpPatch]
        public async Task<ActionResult> UpdateTransaction(UpdateTransactionCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteTransaction(DeleteTransactionCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}