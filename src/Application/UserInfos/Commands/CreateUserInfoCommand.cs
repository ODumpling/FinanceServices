using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using FluentValidation;
using MediatR;

namespace FinanceServices.Application.UserInfos.Commands
{
    public class CreateUserInfoCommand : IRequest<string>
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public class CreateUserInfoValidator : AbstractValidator<CreateUserInfoCommand>
        {
            public CreateUserInfoValidator()
            {
                RuleFor(v => v.FirstName).NotEmpty();
                RuleFor(v => v.LastName).NotEmpty();
                RuleFor(v => v.Email).NotEmpty();
            }
        }

        public class CreateUserInfoCommandHandler : IRequestHandler<CreateUserInfoCommand, string>
        {
            private readonly IApplicationDbContext _context;

            public CreateUserInfoCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(CreateUserInfoCommand request, CancellationToken cancellationToken)
            {
                var userInfo = new UserInfo(request.Id,request.FirstName, request.LastName, request.Email);

                _context.UserInformation.Add(userInfo);

                await _context.SaveChangesAsync(cancellationToken);

                return userInfo.Id;
            }
        }
    }
}