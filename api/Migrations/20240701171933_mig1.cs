using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class mig1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "8ad8da36-d0a0-45c8-a5e7-ee1c9eccbb9a");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "cda3dd34-3dd3-4213-ab04-6d3f015919fc");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Restaurants",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Price_Rating",
                table: "Restaurants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "75c1a667-c08a-41d7-97d4-efdcdef04aef", null, "Admin", "ADMIN" },
                    { "e63aa185-1eac-4dbd-8ff5-fb25aebd2f9e", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "75c1a667-c08a-41d7-97d4-efdcdef04aef");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "e63aa185-1eac-4dbd-8ff5-fb25aebd2f9e");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "Price_Rating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Comments");

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ad8da36-d0a0-45c8-a5e7-ee1c9eccbb9a", null, "Admin", "ADMIN" },
                    { "cda3dd34-3dd3-4213-ab04-6d3f015919fc", null, "User", "USER" }
                });
        }
    }
}
