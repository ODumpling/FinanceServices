using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceServices.Application.Common.Interfaces;
using FinanceServices.Application.Transactions.Commands;
using Hangfire;
using Hangfire.Common;
using Hangfire.Storage;
using Hangfire.Storage.Monitoring;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FinanceServices.Infrastructure.Hangfire
{
    public class JobScheduler : IJobScheduler
    {
        private readonly ISender _meaditor;
        private readonly IApplicationDbContext _context;
        private readonly ILogger<JobScheduler> _logger;

        public JobScheduler(ISender meaditor, IApplicationDbContext context, ILogger<JobScheduler> logger)
        {
            _meaditor = meaditor;
            _context = context;
            _logger = logger;
        }

        public Task CreateWeeklyTransaction(Guid transactionId)
        {
            RecurringJob.AddOrUpdate(transactionId.ToString(), () => GenerateTransaction(transactionId),
                Cron.Weekly);

            _logger.LogInformation("transaction with Id:{Id} has been scheduled for weekly occurrence", transactionId);

            return Task.CompletedTask;
        }

        public Task CreateMonthlyTransaction(Guid transactionId)
        {
            RecurringJob.AddOrUpdate(transactionId.ToString(), () => GenerateTransaction(transactionId), Cron.Monthly);
            _logger.LogInformation("transaction with Id:{Id} has been scheduled for monthly occurrence", transactionId);

            return Task.CompletedTask;
        }

        public Task<List<string>> GetListOfJobs()
        {
            var api = JobStorage.Current.GetConnection();

            var jobs = api.GetRecurringJobs();

            var result = Task.FromResult(jobs.Select(x => x.Id).ToList());

            return result;
        }


        public async Task GenerateTransaction(Guid transactionId)
        {
            var entity = await _context.Transactions.FindAsync(transactionId);

            var description = entity.Description.Contains("Recurring Transaction:");

            await _meaditor.Send(new CreateTransactionCommand
            {
                Amount = entity.Amount,
                Date = DateTime.Now,
                Description = description ? entity.Description : $"Recurring Transaction: {entity.Description}",
                FundId = entity.FundId,
                Type = entity.Type
            });
        }
    }
}