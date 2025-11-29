variable "location" {}
variable "mysql_admin_username" {}
variable "mysql_admin_password" {
  sensitive = true
}
variable "mysql_database_name" {}
variable "resource_group_name" {}
variable "backend_vm_public_ip" {}
