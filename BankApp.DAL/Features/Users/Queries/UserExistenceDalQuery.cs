﻿using BankApp.DAL.Db;
using BankApp.Application.Features.Users.Queries.UserExistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Users.Queries
{
    public class UserExistenceDalQuery : IDalService, IUserExistenceDalQuery
    {
        private readonly AppDbContext _dbContext;

        public UserExistenceDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DoesUserExistByEmailAsync(string userEmail)
        {
            return await _dbContext.Users.AnyAsync(user => user.NormalizedEmail == userEmail.Normalize());
        }

        public async Task<bool> DoesUserExistByIdAsync(string userId)
        {
            return await _dbContext.Users.AnyAsync(user => user.Id == userId);
        }
    }
}
