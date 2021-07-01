using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceServices.Infrastructure.Persistence.Configurations
{
    public class UserInformationConfiguration : IEntityTypeConfiguration<UserInfo>
    {
        public void Configure(EntityTypeBuilder<UserInfo> builder)
        {
            builder.HasMany(x => x.Funds)
                .WithMany(x => x.Users)
                .UsingEntity<Membership>(
                    m => m.HasOne(m => m.Fund)
                        .WithMany(f=> f.Memberships)
                        .HasForeignKey(m=>m.FundId),
                    m=>m.HasOne(m=> m.User)
                        .WithMany(u => u.Memberships)
                        .HasForeignKey(m=>m.UserId));
        }
    }
}