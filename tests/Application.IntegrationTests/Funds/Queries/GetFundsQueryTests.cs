using System.Threading.Tasks;
using FinanceServices.Application.Funds.Commands;
using FinanceServices.Application.Funds.Queries.GetFunds;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Funds.Queries
{
    using static Testing;
    public class GetFundsQueryTests : TestBase
    {
        [Test]
        public async Task ShouldReturnFundsWhereCurrentUserHasMembership()
        {
            await RunAsAdministratorAsync();

            var fundid = await SendAsync(new CreateFundCommand
            {
                Name = "Admin Fund"
            });

            var result = await SendAsync(new GetFundsQuery());

            result.Funds.Items.Should().HaveCount(1);
        }


        [Test]
        public async Task ShouldReturnRelevantFunds()
        {
            await RunAsAdministratorAsync();

            var fundid = await SendAsync(new CreateFundCommand
            {
                Name = "Admin Fund"
            });

            await RunAsDefaultUserAsync();

            var result = await SendAsync(new GetFundsQuery());

            result.Funds.Items.Should().HaveCount(0);
        }
    }
}