using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankApp.DAL.Helpers.BankAccount
{
    public interface IBankAccountHelpers
    {
        string GenerateAccountNumber(int accountId);
    }
}
