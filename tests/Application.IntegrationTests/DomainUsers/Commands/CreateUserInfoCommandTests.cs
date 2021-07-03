using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.DomainUsers.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.DomainUsers.Commands
{
    using static Testing;
    public class CreateUserInfoCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateDomainUserCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}