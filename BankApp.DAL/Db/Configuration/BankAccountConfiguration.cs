using BankApp.DAL.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BankApp.DAL.Db.Configuration
{
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccountEntity>
    {
        public void Configure(EntityTypeBuilder<BankAccountEntity> builder)
        {
            builder.HasKey(acc => acc.Id);
            builder.Property(acc => acc.Id).ValueGeneratedOnAdd();

            builder.HasOne(acc => acc.AccountType)
                .WithMany(accType => accType.BankAccounts)
                .HasForeignKey(acc => acc.AccountTypeId);

            builder.HasOne(acc => acc.User)
                .WithMany(user => user.BankAccounts)
                .HasForeignKey(acc => acc.ClientId);
        }
    }
}
