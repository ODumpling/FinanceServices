using System;
using System.Collections.Generic;

namespace FinanceServices.Domain.Entities
{
    public class UserInfo
    {
        public UserInfo(Guid id, string firstName, string lastName, string email)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            FullName = $"{firstName} {lastName}";
            Email = email;
        }

        public UserInfo(string firstName, string lastName, string email)
        {
            FirstName = firstName;
            LastName = lastName;
            FullName = $"{firstName} {lastName}";
            Email = email;
        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public IList<Fund> Funds { get; set; } = new List<Fund>();
        public IList<Fund> ManagingFunds { get; set; } = new List<Fund>();


        public void UpdateName(string firstName, string lastName)
        {
            if (String.IsNullOrEmpty(firstName))
            {
                FirstName = firstName;
            }

            if (String.IsNullOrEmpty(lastName))
            {
                LastName = lastName;
            }

            FullName = $"{FirstName} {LastName}";
        }
    }
}