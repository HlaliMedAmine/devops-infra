variable "application_name" {
  description = "Application name prefix"
  type        = string
}

variable "environment" {
  description = "Deployment environment like dev, uat, prod"
  type        = string
}

variable "location" {
  description = "Azure Region"
  type        = string
}

locals {
  resource_group_name = "${var.application_name}-${var.environment}"
}

variable "vnet_address_space" {
  description = "Virtual network address space"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "public_subnet_address_prefixes" {
  description = "Address prefixes for public subnet"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "admin_username" {
  default = "azureuser"
}

variable "admin_password" {
  description = "Password for admin user on virtual machines"
  type        = string
  sensitive   = true
}

variable "vm_size" {
  type = string
}

variable "mysql_admin_username" {
  description = "Username for MySQL Flexible Server admin"
  type        = string
}

variable "mysql_admin_password" {
  description = "Password for MySQL Flexible Server admin"
  type        = string
  sensitive   = true
}

variable "mysql_database_name" {
  description = "Database name for Book Review App"
  type        = string
}

variable "ssh_public_key" {
  description = "The actual SSH public key string"
  type        = string
}

