using System;
using FinanceServices.Application.Common.Interfaces;
using CsvHelper;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using FinanceServices.Application.Funds.Queries.ExportFund;
using FinanceServices.Domain.Entities;
using FinanceServices.Infrastructure.Files.Maps;
using FinanceServices.Infrastructure.Files.UploadTypes;
using Microsoft.AspNetCore.Http;

namespace FinanceServices.Infrastructure.Files
{
    public class CsvFileBuilder : ICsvFileBuilder
    {
        public byte[] BuildFundFile(IEnumerable<TransactionRecord> records)
        {
            using var memoryStream = new MemoryStream();
            using (var streamWriter = new StreamWriter(memoryStream))
            {
                using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

                csvWriter.Configuration.RegisterClassMap<TransactionRecordMap>();
                csvWriter.WriteRecords(records);
            }

            return memoryStream.ToArray();
        }


        public IEnumerable<Transaction> ReadFileByProvider(IFormFile file, string type = null)
        {
            switch (type)
            {
                case "MONZO":
                    return ReadFile<MonzoTransactionUploadDto>(file).Select(x => x.MapToTransaction());
                default:
                    return ReadFile<TransactionUploadDto>(file).Select(x => x.MapToTransaction());
            }
        }

        public IEnumerable<T> ReadFile<T>(IFormFile file)
        {
            var stream = file.OpenReadStream();
            using var reader = new StreamReader(stream);
            using (var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Use While(csvReader.Read()); if you want to read all the rows in the records)
                // csvReader.Read();

                return csvReader.GetRecords<T>().ToList();
            }
        }
    }
}