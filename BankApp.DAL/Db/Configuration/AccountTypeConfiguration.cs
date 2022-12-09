using BankApp.DAL.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BankApp.DAL.Db.Configuration
{
    public class AccountTypeConfiguration : IEntityTypeConfiguration<AccountTypeEntity>
    {
        public void Configure(EntityTypeBuilder<AccountTypeEntity> builder)
        {
            builder.Property(accType => accType.Id);
            builder.Property(accType => accType.Id).ValueGeneratedOnAdd();

            builder.HasData(
                new AccountTypeEntity
                {
                    Id = 1,
                    Name = "Konto standardowe",
                    NameEng = "Standard account",
                    Description = "Podstawowy rodzaj konta",
                    DescriptionEng = "Standard account"
                },
                new AccountTypeEntity
                {
                    Id = 2,
                    Name = "Konto oszczędnościowe",
                    NameEng = "Savings account",
                    Description = "Najlepszy wybór gdy chcesz zaoszczędzić",
                    DescriptionEng = "The best choice when you need to save money"
                },
                new AccountTypeEntity
                {
                    Id = 3,
                    Name = "Konto dla młodych",
                    NameEng = "Youth account",
                    Description = "Konto na start, dla osób poniżej 20 roku życia",
                    DescriptionEng = "Starter account, for people aged 20 and lower"
                }
            );
        }
    }
}
