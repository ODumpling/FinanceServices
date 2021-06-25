using System;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Application.Transactions.Commands;
using FinanceServices.Domain.Entities;
using FinanceServices.Domain.Enums;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Transactions.Commands
{
    using static Testing;
    public class DeleteTransactionCommandTests : TestBase
    {

        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new DeleteTransactionCommand();
            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldDeleteTransactionGivenASignedIn()
        {
            await RunAsDefaultUserAsync();

            var fundId = await SendAsync(new CreateFundCommand
            {
                Name = "Test Fund"
            });

            var transactionId = await SendAsync(new CreateTransactionCommand
            {
                FundId = fundId,
                Amount = 500.50M,
                Type = TransactionType.Income,
                Description = "Test transaction",
                Date = DateTime.Now
            });

            await SendAsync(new DeleteTransactionCommand
            {
                Id = transactionId
            });

            var transaction = await FindAsync<Transaction>(transactionId);

            transaction.Should().BeNull();
        }
    }
}