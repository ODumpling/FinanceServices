using System.Threading.Tasks;
using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Funds.Commands
{
    using static Testing;
    public class DeleteFundCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumRequirements()
        {
            var command = new DeleteFundCommand();
            
            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ASignedInUserShouldBeAbleToDeleteAFund()
        {
            await RunAsDefaultUserAsync();
            var id = await SendAsync(new CreateFundCommand
            {
                Name = "New Fund Name"
            });

            await SendAsync(new DeleteFundCommand
            {
                Id = id
            });

            var result = await FindAsync<Fund>(id);

            result.Should().BeNull();
        }
    }
}