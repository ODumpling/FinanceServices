using Hangfire.Dashboard;

namespace FinanceServices.Infrastructure.Hangfire
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {

            var http = context.GetHttpContext();

            // return http.User.IsInRole("Administrator");
            return true;
        }
    }
}