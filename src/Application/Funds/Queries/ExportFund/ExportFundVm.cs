namespace FinanceServices.Application.Funds.Queries.ExportFund
{
    public class ExportFundVm
    {
        public string FileName { get; set; }

        public string ContentType { get; set; }

        public byte[] Content { get; set; }
    }
}