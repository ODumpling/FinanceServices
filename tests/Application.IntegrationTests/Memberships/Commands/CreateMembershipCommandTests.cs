using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.Memberships.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.Memberships.Commands
{
    using static Testing;

    public class CreateMembershipCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateMembershipCommand();

            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }

    }
}