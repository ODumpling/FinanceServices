using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Transactions.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Transactions.Commands
{
    using static Testing;

    public class CreateTransactionCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateTransactionCommand();

            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}