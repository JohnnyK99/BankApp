using BankApp.DAL.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BankApp.DAL.Db.Configuration
{
    internal class TransactionConfiguration : IEntityTypeConfiguration<TransactionEntity>
    {
        public void Configure(EntityTypeBuilder<TransactionEntity> builder)
        {
            builder.HasKey(transaction => transaction.Id);
            builder.Property(transaction => transaction.Id).ValueGeneratedOnAdd();

            builder.Property(transaction => transaction.Title).IsRequired();

            builder.HasOne(transaction => transaction.AccountFrom)
                .WithMany(account => account.OutgoingTransactions)
                .HasForeignKey(transaction => transaction.AccountFromId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(transaction => transaction.AccountTo)
                .WithMany(account => account.IncomingTransactions)
                .HasForeignKey(transaction => transaction.AccountToId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
