resource "azurerm_mysql_flexible_server" "mysql" {
  name                   = "bookreview-db"
  resource_group_name    = var.resource_group_name
  location               = var.location
  administrator_login    = var.mysql_admin_username
  administrator_password = var.mysql_admin_password
  sku_name               = "B_Standard_B1ms"
  version                = "5.7"
}

resource "azurerm_mysql_flexible_database" "bookreviews_db" {
  name                = var.mysql_database_name
  resource_group_name = var.resource_group_name
  server_name         = azurerm_mysql_flexible_server.mysql.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"
}

resource "azurerm_mysql_flexible_server_firewall_rule" "allow_backend_vm" {
  name                = "allow-backend-vm"
  resource_group_name = var.resource_group_name
  server_name         = azurerm_mysql_flexible_server.mysql.name
  start_ip_address    = var.backend_vm_public_ip
  end_ip_address      = var.backend_vm_public_ip
}
