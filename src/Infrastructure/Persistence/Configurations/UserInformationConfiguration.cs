using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceServices.Infrastructure.Persistence.Configurations
{
    public class UserInformationConfiguration : IEntityTypeConfiguration<DomainUser>
    {
        public void Configure(EntityTypeBuilder<DomainUser> builder)
        {
            builder.HasMany(x => x.Funds)
                .WithMany(x => x.Users)
                .UsingEntity<Membership>(
                    m => m.HasOne(m => m.Fund)
                        .WithMany(f=> f.Memberships)
                        .HasForeignKey(m=>m.FundId),
                    m=>m.HasOne(m=> m.DomainUser)
                        .WithMany(u => u.Memberships)
                        .HasForeignKey(m=>m.UserId));
        }
    }
}