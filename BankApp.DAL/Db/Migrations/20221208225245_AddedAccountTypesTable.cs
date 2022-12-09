using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class AddedAccountTypesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "AccountTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameEng = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionEng = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountTypes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AccountTypes",
                columns: new[] { "Id", "Description", "DescriptionEng", "Name", "NameEng" },
                values: new object[,]
                {
                    { 1, "Podstawowy rodzaj konta", "Standard account", "Konto standardowe", "Standard account" },
                    { 2, "Najlepszy wybór gdy chcesz zaoszczędzić", "The best choice when you need to save money", "Konto oszczędnościowe", "Savings account" },
                    { 3, "Konto na start, dla osób poniżej 20 roku życia", "Starter account, for people aged 20 and lower", "Konto dla młodych", "Youth account" }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c89cae33-812b-469f-8fc7-76487c1f8ea7", "b7ffe98e-e464-4fe6-aead-96fa1ae26de6", "Client", "CLIENT" },
                    { "e4bbdecc-b970-4e68-80fc-a63346381083", "ff39bc06-fce0-4a6f-8e81-172c395eeb0c", "Employee", "EMPLOYEE" },
                    { "f6472c98-1d54-49f4-a37d-983a23f6de52", "a43e59bd-9383-4b58-ad91-2c9e4bc0d51b", "Administrator", "ADMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountTypes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c89cae33-812b-469f-8fc7-76487c1f8ea7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4bbdecc-b970-4e68-80fc-a63346381083");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6472c98-1d54-49f4-a37d-983a23f6de52");

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
    }
}
