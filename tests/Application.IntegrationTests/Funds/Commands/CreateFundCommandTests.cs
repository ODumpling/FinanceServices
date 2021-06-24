using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Funds.Commands
{
    using static Testing;

    public class CreateFundCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateFundCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateFundWithCorrectDetails()
        {
            await RunAsDefaultUserAsync();

            var name = "New Budget";
            var command = new CreateFundCommand
            {
                Name = name
            };

            var id = await SendAsync(command);

            var result = await FindAsync<Fund>(id);

            result.Name.Should().Be(name);
            result.Balance.Should().Be(0);
        }
    }
}