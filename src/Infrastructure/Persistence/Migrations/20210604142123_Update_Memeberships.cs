using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceServices.Infrastructure.Persistence.Migrations
{
    public partial class Update_Memeberships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Membership_Funds_FundId",
                table: "Membership");

            migrationBuilder.DropForeignKey(
                name: "FK_Membership_UserInformation_UserId",
                table: "Membership");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Membership",
                table: "Membership");

            migrationBuilder.RenameTable(
                name: "Membership",
                newName: "Memberships");

            migrationBuilder.RenameIndex(
                name: "IX_Membership_UserId",
                table: "Memberships",
                newName: "IX_Memberships_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Memberships",
                table: "Memberships",
                columns: new[] { "FundId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Memberships_Funds_FundId",
                table: "Memberships",
                column: "FundId",
                principalTable: "Funds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Memberships_UserInformation_UserId",
                table: "Memberships",
                column: "UserId",
                principalTable: "UserInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Memberships_Funds_FundId",
                table: "Memberships");

            migrationBuilder.DropForeignKey(
                name: "FK_Memberships_UserInformation_UserId",
                table: "Memberships");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Memberships",
                table: "Memberships");

            migrationBuilder.RenameTable(
                name: "Memberships",
                newName: "Membership");

            migrationBuilder.RenameIndex(
                name: "IX_Memberships_UserId",
                table: "Membership",
                newName: "IX_Membership_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Membership",
                table: "Membership",
                columns: new[] { "FundId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Membership_Funds_FundId",
                table: "Membership",
                column: "FundId",
                principalTable: "Funds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Membership_UserInformation_UserId",
                table: "Membership",
                column: "UserId",
                principalTable: "UserInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
