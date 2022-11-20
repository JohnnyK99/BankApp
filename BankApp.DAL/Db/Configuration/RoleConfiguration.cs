using BankApp.DAL.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BankApp.DAL.Db.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = UserRoles.Administrator,
                    NormalizedName = UserRoles.Administrator.ToUpper()
                },
                new IdentityRole
                {
                    Name = UserRoles.Employee,
                    NormalizedName = UserRoles.Employee.ToUpper()
                },
                new IdentityRole
                {
                    Name = UserRoles.Client,
                    NormalizedName = UserRoles.Client.ToUpper()
                }
           );
        }
    }
}
