using FinanceServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceServices.Infrastructure.Persistence.Configurations
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Ignore(x => x.DomainEvents);
            builder.Property(x => x.Amount).HasPrecision(12, 2);

            builder.HasMany(x => x.Categories)
                .WithMany(x => x.Transactions)
                .UsingEntity<CategoryTransaction>(
                    ct => ct.HasOne(x => x.Category)
                        .WithMany(c => c.CategoryTransactions)
                        .HasForeignKey(ct => ct.CategoryId).OnDelete(DeleteBehavior.NoAction),
                    ct=> ct.HasOne(x => x.Transaction)
                        .WithMany(t => t.CategoryTransactions)
                        .HasForeignKey(ct => ct.TransactionId).OnDelete(DeleteBehavior.NoAction)
                );
        }
    }
}