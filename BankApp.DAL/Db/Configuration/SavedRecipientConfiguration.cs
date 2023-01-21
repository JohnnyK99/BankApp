using BankApp.DAL.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BankApp.DAL.Db.Configuration
{
    public class SavedRecipientConfiguration : IEntityTypeConfiguration<SavedRecipientEntity>
    {
        public void Configure(EntityTypeBuilder<SavedRecipientEntity> builder)
        {
            builder.HasKey(recipient => new { recipient.UserId, recipient.AccountId });

            builder.HasOne(recipient => recipient.User)
                .WithMany(user => user.SavedRecipients)
                .HasForeignKey(recipient => recipient.UserId);

            builder.HasOne(recipient => recipient.BankAccount)
                .WithMany(account => account.SavedRecipients)
                .HasForeignKey(recipient => recipient.AccountId);
        }
    }
}
