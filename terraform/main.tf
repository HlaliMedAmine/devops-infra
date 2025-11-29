resource "azurerm_resource_group" "rg" {
  name     = "${var.application_name}-${var.environment}-rg"
  location = var.location
}

module "network" {
  source                         = "./modules/network"
  resource_group_name            = azurerm_resource_group.rg.name
  location                       = var.location
  application_name               = var.application_name
  environment                    = var.environment
  vnet_address_space             = var.vnet_address_space
  public_subnet_address_prefixes = var.public_subnet_address_prefixes
}

module "compute" {
  source              = "./modules/compute"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  admin_username      = var.admin_username
  admin_password      = var.admin_password
  vnet_subnet_id      = module.network.public_subnet_id
  application_name    = var.application_name
  environment         = var.environment
  vm_size             = var.vm_size
  ssh_public_key      = var.ssh_public_key
}

module "database" {
  source               = "./modules/database"
  resource_group_name  = azurerm_resource_group.rg.name
  location             = var.location
  mysql_admin_username = var.mysql_admin_username
  mysql_admin_password = var.mysql_admin_password
  mysql_database_name  = var.mysql_database_name
  backend_vm_public_ip = module.compute.backend_public_ip
}
