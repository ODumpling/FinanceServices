using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceServices.Infrastructure.Persistence.Migrations
{
    public partial class Update_DomainUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "DomainUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "DomainUsers");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "DomainUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "DomainUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "DomainUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "DomainUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "DomainUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "DomainUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
