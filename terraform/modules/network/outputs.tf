output "public_subnet_id" {
  value = azurerm_subnet.public_subnet.id
}

output "nsg_id" {
  value = azurerm_network_security_group.nsg.id
}
