using System.Threading;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Domain.Entities;
using FluentValidation;
using MediatR;

namespace FinanceServices.Application.DomainUsers.Commands
{
    public class CreateDomainUserCommand : IRequest<string>
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public class CreateUserInfoValidator : AbstractValidator<CreateDomainUserCommand>
        {
            public CreateUserInfoValidator()
            {
                RuleFor(v => v.FirstName).NotEmpty();
                RuleFor(v => v.LastName).NotEmpty();
                RuleFor(v => v.Email).NotEmpty();
            }
        }

        public class CreateUserInfoCommandHandler : IRequestHandler<CreateDomainUserCommand, string>
        {
            private readonly IApplicationDbContext _context;

            public CreateUserInfoCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(CreateDomainUserCommand request, CancellationToken cancellationToken)
            {
                var userInfo = new DomainUser
                {
                    Id = request.Id
                };

                _context.DomainUsers.Add(userInfo);

                await _context.SaveChangesAsync(cancellationToken);

                return userInfo.Id;
            }
        }
    }
}