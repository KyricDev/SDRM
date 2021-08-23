using Microsoft.EntityFrameworkCore.Migrations;

namespace SDRM.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoadMapItem_Users_UserID",
                table: "RoadMapItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoadMapItem",
                table: "RoadMapItem");

            migrationBuilder.RenameTable(
                name: "RoadMapItem",
                newName: "RoadMapItems");

            migrationBuilder.RenameIndex(
                name: "IX_RoadMapItem_UserID",
                table: "RoadMapItems",
                newName: "IX_RoadMapItems_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoadMapItems",
                table: "RoadMapItems",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_RoadMapItems_Users_UserID",
                table: "RoadMapItems",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoadMapItems_Users_UserID",
                table: "RoadMapItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoadMapItems",
                table: "RoadMapItems");

            migrationBuilder.RenameTable(
                name: "RoadMapItems",
                newName: "RoadMapItem");

            migrationBuilder.RenameIndex(
                name: "IX_RoadMapItems_UserID",
                table: "RoadMapItem",
                newName: "IX_RoadMapItem_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoadMapItem",
                table: "RoadMapItem",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_RoadMapItem_Users_UserID",
                table: "RoadMapItem",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
