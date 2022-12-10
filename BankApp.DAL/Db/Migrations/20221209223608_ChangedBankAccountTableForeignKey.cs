using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class ChangedBankAccountTableForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankAccounts_AspNetUsers_ClientEmail",
                table: "BankAccounts");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08d04e35-8276-4ebc-aec3-84873daf9a2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5f4a28f0-0401-4865-9219-eb4557cd8db0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a978af7c-d12d-4b9a-9b0b-4f04f2574b17");

            migrationBuilder.RenameColumn(
                name: "ClientEmail",
                table: "BankAccounts",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_BankAccounts_ClientEmail",
                table: "BankAccounts",
                newName: "IX_BankAccounts_ClientId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2885cf50-6808-45c4-9966-bacae273a561", "d5f1abdf-fdae-4f18-91e7-7e7569884dd5", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7c56bd76-1b5d-4a0e-8c69-a0ceda3684b5", "cfbf3952-46ec-4d0d-852a-80b2e3c46398", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a98db05f-03fe-4069-b35d-87de5ee96d5d", "69c94a72-0f6c-4678-acc5-3e05e2eecd6a", "Client", "CLIENT" });

            migrationBuilder.AddForeignKey(
                name: "FK_BankAccounts_AspNetUsers_ClientId",
                table: "BankAccounts",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankAccounts_AspNetUsers_ClientId",
                table: "BankAccounts");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2885cf50-6808-45c4-9966-bacae273a561");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c56bd76-1b5d-4a0e-8c69-a0ceda3684b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a98db05f-03fe-4069-b35d-87de5ee96d5d");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "BankAccounts",
                newName: "ClientEmail");

            migrationBuilder.RenameIndex(
                name: "IX_BankAccounts_ClientId",
                table: "BankAccounts",
                newName: "IX_BankAccounts_ClientEmail");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "08d04e35-8276-4ebc-aec3-84873daf9a2a", "3cf66bc6-18d8-46fe-9861-73fcc94fe35e", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5f4a28f0-0401-4865-9219-eb4557cd8db0", "76500d5f-0954-4f79-8e4b-6dc0105eced9", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a978af7c-d12d-4b9a-9b0b-4f04f2574b17", "907ffbca-4bef-4d82-95ca-d4be93676c81", "Client", "CLIENT" });

            migrationBuilder.AddForeignKey(
                name: "FK_BankAccounts_AspNetUsers_ClientEmail",
                table: "BankAccounts",
                column: "ClientEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
