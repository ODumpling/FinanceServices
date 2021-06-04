using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceServices.Infrastructure.Persistence.Migrations
{
    public partial class Create_Memeberships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Funds_FundId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "FundUserInfo");

            migrationBuilder.AlterColumn<Guid>(
                name: "FundId",
                table: "Transactions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    FundId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => new { x.FundId, x.UserId });
                    table.ForeignKey(
                        name: "FK_Membership_Funds_FundId",
                        column: x => x.FundId,
                        principalTable: "Funds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Membership_UserInformation_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Membership_UserId",
                table: "Membership",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Funds_FundId",
                table: "Transactions",
                column: "FundId",
                principalTable: "Funds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Funds_FundId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "Membership");

            migrationBuilder.AlterColumn<Guid>(
                name: "FundId",
                table: "Transactions",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "FundUserInfo",
                columns: table => new
                {
                    FundsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FundUserInfo", x => new { x.FundsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_FundUserInfo_Funds_FundsId",
                        column: x => x.FundsId,
                        principalTable: "Funds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FundUserInfo_UserInformation_UsersId",
                        column: x => x.UsersId,
                        principalTable: "UserInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FundUserInfo_UsersId",
                table: "FundUserInfo",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Funds_FundId",
                table: "Transactions",
                column: "FundId",
                principalTable: "Funds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
