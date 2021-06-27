using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Memberships.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Memberships.Commands
{
    using static Testing;

    public class DeleteMembershipCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new DeleteMembershipCommand();

            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}