using FinanceServices.Application.Common.Interfaces;
using System;

namespace FinanceServices.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
