terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Провайдер AWS і регіон
provider "aws" {
  region = var.aws_region
}

# Security group: відкриваємо SSH (22) і застосунок (3000)
resource "aws_security_group" "nodeapp_sg" {
  name        = "nodeapp-sg"
  description = "SSH and Node app port"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Node app"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 сервер
resource "aws_instance" "nodeapp" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.nodeapp_sg.id]

  # Ставимо Docker і docker compose при першому запуску
  user_data = <<-EOT
    #!/bin/bash
    curl -fsSL https://get.docker.com | sh
    apt-get install -y docker-compose-plugin
    usermod -aG docker ubuntu
  EOT

  tags = {
    Name = "nodeapp-server"
  }
}
