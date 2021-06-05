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
                    x => x.HasOne(x => x.Fund).WithMany(x=> x.Memberships).HasForeignKey(x=>x.FundId),
                    x=>x.HasOne(x=> x.User).WithMany(x => x.Memberships).HasForeignKey(x=>x.UserId));
        }
    }
}