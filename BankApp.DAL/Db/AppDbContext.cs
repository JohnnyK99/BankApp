﻿using BankApp.DAL.Db.Configuration;
using BankApp.DAL.Db.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BankApp.DAL.Db
{
    public class AppDbContext : IdentityDbContext<UserEntity>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) 
        {
        }

        public DbSet<AccountTypeEntity> AccountTypes { get; set; }
        public DbSet<BankAccountEntity> BankAccounts { get; set; }
        public DbSet<TransactionEntity> Transactions { get; set; }
        public DbSet<SavedRecipientEntity> SavedRecipients { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new AccountTypeConfiguration());
            builder.ApplyConfiguration(new BankAccountConfiguration());
            builder.ApplyConfiguration(new TransactionConfiguration());
            builder.ApplyConfiguration(new SavedRecipientConfiguration());
        }
    }
}
