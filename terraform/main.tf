resource "azurerm_resource_group" "main" {

  name     = var.resource_group_name
  location = var.location

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}

resource "azurerm_virtual_network" "main" {

  name                = var.vnet_name
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  address_space = [
    "10.0.0.0/16"
  ]

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}

resource "azurerm_subnet" "main" {

  name                 = var.subnet_name
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name

  address_prefixes = [
    "10.0.1.0/24"
  ]

}

resource "azurerm_public_ip" "main" {

  name                = var.public_ip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  allocation_method = "Static"

  sku = "Standard"

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}

resource "azurerm_network_security_group" "main" {

  name                = var.nsg_name
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}

resource "azurerm_network_security_rule" "ssh" {

  name = "Allow-SSH"

  priority = 100

  direction = "Inbound"

  access = "Allow"

  protocol = "Tcp"

  source_port_range = "*"

  destination_port_range = "22"

  source_address_prefix = "*"

  destination_address_prefix = "*"

  resource_group_name = azurerm_resource_group.main.name

  network_security_group_name = azurerm_network_security_group.main.name

}

resource "azurerm_network_security_rule" "http" {

  name = "Allow-HTTP"

  priority = 110

  direction = "Inbound"

  access = "Allow"

  protocol = "Tcp"

  source_port_range = "*"

  destination_port_range = "80"

  source_address_prefix = "*"

  destination_address_prefix = "*"

  resource_group_name = azurerm_resource_group.main.name

  network_security_group_name = azurerm_network_security_group.main.name

}

resource "azurerm_network_interface" "main" {

  name                = var.nic_name
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {

    name = "internal"

    subnet_id = azurerm_subnet.main.id

    private_ip_address_allocation = "Dynamic"

    public_ip_address_id = azurerm_public_ip.main.id

  }

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}

resource "azurerm_subnet_network_security_group_association" "main" {

  subnet_id = azurerm_subnet.main.id

  network_security_group_id = azurerm_network_security_group.main.id

}

resource "azurerm_linux_virtual_machine" "main" {

  name                = var.vm_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location

  size = "Standard_B1s"

  admin_username = var.admin_username

  network_interface_ids = [
    azurerm_network_interface.main.id
  ]

  disable_password_authentication = true

  admin_ssh_key {

    username   = var.admin_username
    public_key = var.ssh_public_key

  }

  os_disk {

    caching              = "ReadWrite"

    storage_account_type = "Standard_LRS"

  }

  source_image_reference {

    publisher = "Canonical"

    offer     = "ubuntu-24_04-lts"

    sku        = "server"

    version    = "latest"

  }

  tags = {
    Owner      = var.owner
    CostCenter = var.cost_center
  }

}