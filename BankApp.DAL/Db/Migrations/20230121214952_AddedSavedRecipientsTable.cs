using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApp.DAL.Migrations
{
    public partial class AddedSavedRecipientsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b42803f-9b0a-40a2-a435-dbdcb1b4b602");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7de53beb-2f4a-4c8e-b778-9bc961d3f83c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "87446e1c-15c0-444d-8a58-67e6a490d35e");

            migrationBuilder.CreateTable(
                name: "SavedRecipients",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedRecipients", x => new { x.UserId, x.AccountId });
                    table.ForeignKey(
                        name: "FK_SavedRecipients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedRecipients_BankAccounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "08120f55-eda6-40cb-b0f1-c851831a3a09", "f9d4bfd5-f110-4a61-be68-54e3fe1e14f6", "Client", "CLIENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "44938add-dda3-4bf3-9401-df917c8c41b6", "fee070d7-e9a0-4b8b-8a8d-720478f5a667", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c147711f-c923-4724-b4db-d89fbb5d592d", "bb19b17c-cee2-435e-8235-431ae2f316e4", "Employee", "EMPLOYEE" });

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipients_AccountId",
                table: "SavedRecipients",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedRecipients");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08120f55-eda6-40cb-b0f1-c851831a3a09");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44938add-dda3-4bf3-9401-df917c8c41b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c147711f-c923-4724-b4db-d89fbb5d592d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4b42803f-9b0a-40a2-a435-dbdcb1b4b602", "8d2c19cf-1ebf-464c-ab54-062a44952232", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7de53beb-2f4a-4c8e-b778-9bc961d3f83c", "de4cba2f-d212-41e8-81d4-1c56a34be711", "Client", "CLIENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "87446e1c-15c0-444d-8a58-67e6a490d35e", "88beb32e-3bb4-422e-8d3c-13988e145307", "Employee", "EMPLOYEE" });
        }
    }
}
