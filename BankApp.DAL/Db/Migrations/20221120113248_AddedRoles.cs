using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class AddedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1f82ca95-dd96-4fd0-88c5-58af5fa2ad70", "a261b46f-1a54-4716-b164-15b8a609a274", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bbee0c6a-878c-4b8c-ab49-34507104b9b5", "0cafd7ef-2b9d-4c63-8f4d-9d3507630073", "Client", "CLIENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c1c1de8f-2d84-46cd-bb57-238a390801da", "6f7ec491-8f3e-4057-9fcf-2a9d8c338eb3", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f82ca95-dd96-4fd0-88c5-58af5fa2ad70");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbee0c6a-878c-4b8c-ab49-34507104b9b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c1c1de8f-2d84-46cd-bb57-238a390801da");
        }
    }
}
