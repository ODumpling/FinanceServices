using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceServices.Infrastructure.Persistence.Configurations
{
    public class FundConfiguration : IEntityTypeConfiguration<Fund>
    {
        public void Configure(EntityTypeBuilder<Fund> builder)
        {
            builder.HasOne(x => x.Manager)
                .WithMany(x => x.ManagingFunds)
                .HasForeignKey(x => x.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Ignore(x => x.DomainEvents);

            builder.Property(x => x.Balance).HasPrecision(12, 2);
            builder.Property(x => x.Income).HasPrecision(12, 2);
            builder.Property(x => x.Expenses).HasPrecision(12, 2);
        }
    }
}