output "frontend_public_ip" {
  value = azurerm_public_ip.frontend_pip.ip_address
}

output "backend_public_ip" {
  value = azurerm_public_ip.backend_pip.ip_address
}
