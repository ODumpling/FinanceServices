using System;
using System.Threading.Tasks;

namespace FinanceServices.Application.Common.Interfaces
{
    public interface IJobScheduler
    {
        Task CreateWeeklyTransaction(Guid transactionId);
        Task CreateMonthlyTransaction(Guid transactionId);
    }
}