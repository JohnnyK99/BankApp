using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class ChangedRefreshTokenExpType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<double>(
                name: "RefreshTokenExp",
                table: "AspNetUsers",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0748a772-3d61-4666-954d-ff12ef23d248", "04d79776-60d9-4640-ad8f-7377c29c4234", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "dc8ca1a1-ab2f-463c-860a-7aab776ef506", "b50c0638-ff31-4e58-9416-a8eba9324ddb", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fa46f568-8887-4d90-8622-ae5f75de9447", "401ed92c-816d-4e36-adcc-3ef84565ced7", "Client", "CLIENT" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0748a772-3d61-4666-954d-ff12ef23d248");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc8ca1a1-ab2f-463c-860a-7aab776ef506");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa46f568-8887-4d90-8622-ae5f75de9447");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshTokenExp",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
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
    }
}
