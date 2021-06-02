using System;
using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using FluentValidation;
using MediatR;

namespace FinanceServices.Application.UserInfos.Commands
{
    public class CreateUserInfoCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
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

        public class CreateUserInfoCommandHandler : IRequestHandler<CreateUserInfoCommand, Guid>
        {
            private readonly IApplicationDbContext _context;

            public CreateUserInfoCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Guid> Handle(CreateUserInfoCommand request, CancellationToken cancellationToken)
            {
                var userInfo = new UserInfo(request.FirstName, request.LastName, request.Email);

                userInfo.UpdateName(request.FirstName, request.LastName);
                await _context.SaveChangesAsync(cancellationToken);

                return userInfo.Id;
            }
        }
    }
}