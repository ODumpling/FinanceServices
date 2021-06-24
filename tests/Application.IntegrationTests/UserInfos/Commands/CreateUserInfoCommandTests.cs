using FinanceServices.Application.Common.Exceptions;
using FinanceServices.Application.UserInfos.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace FinanceServices.Application.IntegrationTests.UserInfos.Commands
{
    using static Testing;
    public class CreateUserInfoCommandTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateUserInfoCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}