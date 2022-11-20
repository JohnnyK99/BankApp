using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class MadeRefreshTokenFieldsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "RefreshTokenExp",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4c6fe9f7-8333-4ad9-b645-8a14cc79ee4a", "c8c009af-3a9d-4639-9ef9-f96384e8ec2c", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "501ad176-fce9-4011-b664-43fe3221abdf", "1d2d3b78-a239-4830-91b5-e88a90d4bb1d", "Client", "CLIENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "97884a2b-c652-4377-ba16-9bd7c1611991", "5390a73e-434a-4823-84f2-a8e1dc8c3a23", "Employee", "EMPLOYEE" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4c6fe9f7-8333-4ad9-b645-8a14cc79ee4a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "501ad176-fce9-4011-b664-43fe3221abdf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97884a2b-c652-4377-ba16-9bd7c1611991");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshTokenExp",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
    }
}
